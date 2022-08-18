// dotenv
import dotenv from 'dotenv'
dotenv.config();

// modules
import { By, until, WebDriver } from 'selenium-webdriver';

// logger
import {   
    loggerDebug,
 } from '../../../config/winston';

// node-json-db
// import { db } from '../../config/nodejsondb';

import { 
    getDriverHandler,

    findElementById,

    naviGet,
    naviBack,
    naviForward,
    naviRefresh,

 } from '../../../modules';
  
 describe('Module navigation', () => {
    // 웹드라이버 설정
    let driver : WebDriver;
    let url = 'https://testpages.herokuapp.com/styled/index.html';

    beforeEach(async () => {
        driver = await getDriverHandler();
        await naviGet(driver,url)
    })

    afterEach(async () => {
        await driver.quit()
    })

    test('naviGet', async () => {
        try {
            let currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).toEqual(url);
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('naviBack', async () => {
        try {
            await (await findElementById(driver,'basicpagetest')).click();
            await naviBack(driver);
            let currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).toEqual(url);
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('naviForward', async () => {
        try {
            await (await findElementById(driver,'basicpagetest')).click();
            await naviBack(driver);
            await naviForward(driver);
            let currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).toEqual('https://testpages.herokuapp.com/styled/basic-web-page-test.html');
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('naviRefresh', async () => {
        try {
            await naviRefresh(driver);
            let currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).toEqual(url);
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }

    })

})