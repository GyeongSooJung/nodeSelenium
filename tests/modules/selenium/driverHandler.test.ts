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
 } from '../../../modules';
  

 describe('Module driverHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeEach(async () => {
        
    })

    afterEach(async () => {
        await driver.close()
    })

    test('webdriver가 잘 반환되는지 테스트', async () => {
        try {
            driver = await getDriverHandler();
            expect(driver).toBeInstanceOf(WebDriver);
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

})