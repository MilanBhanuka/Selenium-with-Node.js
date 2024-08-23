const { expect } = require("chai");
const { Builder, By, Select } = require("selenium-webdriver"); 
const { describe, it, beforeEach, afterEach, before, after } = require("mocha");   
const {SandwichPage} = require("../page_models/sandwichPage");

describe("sandwich order", function() {
        this.timeout(5000);
        let driver;  
        let sandwichPage;   

        // beforeEach - runs before each test
        beforeEach(async function() {
                // setup
                await driver.get("http://localhost:4200/order/sandwich");
                sandwichPage = new SandwichPage(driver);
                await sandwichPage.validatePage();
        });

        // afterEach - runs after each test
        afterEach(async function() {
                
        });

        // before - runs before all tests
        before(async function() {
                driver =  await new Builder().forBrowser('chrome').build();

                // set implicit wait to 1 second to wait for elements to appear on the page before throwing an error 
                await driver.manage().setTimeouts({ implicit: 1000 });
        });

        // after - runs after all tests
        after(async function() {
                // teardown
                await driver.quit();
        });


        //describe - groups tests together 
        describe('bread type selection', function() {
                it("display the selected value",async function() {
                        // act
                        await sandwichPage.selectRyeBreadOption();
        
                        // assert
                        let selectedValue = await sandwichPage.getBreadTypeOverview();
                        expect(selectedValue).to.equal("rye bread");
        
                }); 
                
                it("remove the placeholder text",async function() {
                        // act
                        await sandwichPage.selectRyeBreadOption();
        
                        // assert
                        let selectedValue = await sandwichPage.getBreadTypeOverview();
                        expect(selectedValue).to.equal("rye bread");
        
                });
        });

         

        it("select the main filling", async function() {
                // act
                await sandwichPage.selectTofuFillingOption();

                // assert
                let selectedFillingValue = await sandwichPage.getMainFillingOverview();
                expect(selectedFillingValue).to.equal("tofu");  
        });


        it('Update the total price when the bread type selected', async function() {
                // act
                expect(await sandwichPage.getTotalPrice()).to.equal("$0");

                await sandwichPage.selectRyeBreadOption();

                // assert
                expect(await sandwichPage.getTotalPrice()).to.equal("$6");
        });


        it('select extra filling', async function() {
                // act
                await sandwichPage.selectExtraSaladFilling();
                await sandwichPage.selectExtraKetchupFilling();

                // assert
                let selectedExtraFillingValue = await sandwichPage.getExtraFillingOverview();
                expect(selectedExtraFillingValue).to.equal("salad, ketchup");
        });


        describe('when the network has high latency', function() {
                beforeEach(async function() {
                        await driver.setNetworkConditions({
                                offline: false,
                                latency: 1000, // 1 second
                                download_throughput: 35*1024, // 35kb/s
                                upload_throughput: 50*1024, // 50kb/s
                        });
                });

                afterEach(async function() {
                        await driver.setNetworkConditions({
                                offline: false,
                                latency: 0,
                                download_throughput: 0,
                                upload_throughput: 0,
                        });
                });

                it('displays spinning wheel when redeeming promo code', async function() {
                        // act
                        await sandwichPage.setValidPromoCode();
                        await sandwichPage.redeemPromoCode();

                        // assert
                        expect(await sandwichPage.getSpinner().isDisplayed()).to.be.true;
                });
        });
});