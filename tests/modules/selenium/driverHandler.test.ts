// dotenv
import dotenv from 'dotenv'
dotenv.config();

// modules
import { By, until, WebDriver } from 'selenium-webdriver';

// logger
import {   
    loggerInfo,
    loggerError,
    loggerHttp,
    loggerDebug,
 } from '../../../config/winston';

// node-json-db
// import { db } from '../../config/nodejsondb';

import { 
    getDriverHandler,

    alertCloseAccept,
    alertCloseDismiss,
    promptCloseHandler,

    addCookie,
    getOneCookie,
    getAllCookie,
    deleteOneCookie,
    deleteAllCookie,

    fileRegister,

    findElementById,
    findElementByName,
    findElementByXpath,


    JqChangeValueByID,
    JqRemoveAttribute,

    naviGet,
    naviBack,
    naviForward,
    naviRefresh,

    popupClose

 } from '../../../modules';
  

 describe('Module driverHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeEach(async () => {
        
    })

    afterEach(async () => {
        await driver.quit()
    })

    test('webdriver가 잘 반환되는지 테스트', async () => {
        driver = await getDriverHandler();

        expect(driver).toBeInstanceOf(WebDriver);
    })

})