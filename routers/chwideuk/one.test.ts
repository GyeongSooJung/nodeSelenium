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
 } from '../../config/winston';

// node-json-db
import { db } from '../../config/nodejsondb';

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

 } from '../../modules';
  

 describe('GET /one', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeAll(async () => {
        driver = await getDriverHandler();
    })

    afterAll(async () => {
        await driver.quit()
    })

    test('url 잘 뜨는지 확인', async () => {
        try {
            // 브라우저에 접속
            await driver.get('https://typo.tistory.com/');

            // 현재 주소 가져오기
            const text = await driver.getCurrentUrl();

            // test
            expect(text).toEqual('https://typo.tistory.com/')
        }
        catch(Err) {
            console.log(Err)
            loggerDebug.info(Err)
            throw Error;
        }
    })

 })

