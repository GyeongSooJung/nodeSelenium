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
  

 describe('Module alertHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeAll(async () => {
        driver = await getDriverHandler();
    })

    afterAll(async () => {
        await driver.quit()
    })

    test('alert 확인버튼 테스트', async () => {

    })

    test('alert 닫기버튼 테스트', async () => {

    })

    test('prompt 테스트', async () => {

    })
})