// dotenv
import dotenv from 'dotenv'
dotenv.config();

// modules
import { By, until, WebDriver } from 'selenium-webdriver';

// logger
import {   
    loggerDebug,
 } from '../../../config/winston';

import { 
    getDriverHandler,

    findElementById,

    naviGet,

    popupClose

 } from '../../../modules';
  

 describe('Module popupHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeEach(async () => {
        driver = await getDriverHandler();
        await naviGet(driver,'https://testpages.herokuapp.com/styled/alerts/alert-test.html');
    })

    afterEach(async () => {
        await driver.quit()
    })

    test('popupClose', async () => {
        try {
            await (await findElementById(driver,'promptexample')).click();
            popupClose(driver);
            let windowNmber = await (await driver.getAllWindowHandles()).length;
            expect(windowNmber).toEqual(1);
        }
        catch (Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

})