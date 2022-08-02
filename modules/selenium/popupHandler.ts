import { WebDriver } from "selenium-webdriver";

export const popupClose = async (driver : WebDriver ) => {

    // window handles 0 빼고 모든 윈도우 닫음
    (await driver.getAllWindowHandles()).map(async (item : string, index: number)=> {
        if(index > 0) {
            await driver.switchTo().window((await driver.getAllWindowHandles())[index]);
            driver.close();
        }
    })

    // 메인 윈도우로 이동
    await driver.switchTo().window((await driver.getAllWindowHandles())[0]);

}