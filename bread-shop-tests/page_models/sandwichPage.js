const { Builder, By, Select, until } = require("selenium-webdriver"); 

class SandwichPage{
        constructor(driver){
                this.driver = driver;
        }

        async validatePage(){
                let title = await this.driver.getTitle();
                if(title != "Order a Sandwich | BreadShop"){
                        throw Error("Yoy are on the wrong page");
                }
        }

        selectRyeBreadOption(){
                return this.driver.findElement(By.id("bread-type-rye")).click();
        }

        getBreadTypeOverview(){
                return this.driver.findElement(By.className("bread-type-value")).getText();
        }


        async selectTofuFillingOption(){
                let mainFillingElement = await this.driver.findElement(By.id("form-select-main-filling"));
                let select = new Select(mainFillingElement);
                await select.selectByValue("tofu");
        }

        getMainFillingOverview(){
                return this.driver.findElement(By.className("main-filling-value")).getText();
        }


        getTotalPrice(){
                return this.driver.wait(until.elementLocated(By.className("total-price")),1000,"Total price was not located",6).getText();
                //  until.elementLocated - wait for the element to be located on the page before throwing an error 
        }


        selectExtraSaladFilling(){
                return this.driver.findElement(By.css('[value="salad"]')).click();
        }

        selectExtraKetchupFilling(){
                return this.driver.findElement(By.css('[value="ketchup"]')).click();
        }

        getExtraFillingOverview(){
                return this.driver.findElement(By.className("extra-filling-value")).getText();
        }

        getBreadTypePlaceholders(){
                return this.driver.findElements(By.className("bread-type-placeholder"));
        }

        setValidPromoCode(){
                return this.driver.findElement(By.className('form-input-promo-code')).sendKeys('SPRING10');
        }

        redeemPromoCode(){
                return this.driver.findElement(By.className('redeem-promo-code')).click();
        }

        getSpinner(){
                return this.driver.findElement(By.css('.redeem-promo-code .spinner-border'));
        }

}

module.exports = {SandwichPage};