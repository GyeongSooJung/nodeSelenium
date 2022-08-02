// dotenv
import dotenv from 'dotenv'
dotenv.config();

// modules
import { By, until, WebDriver } from 'selenium-webdriver';

// logger
import { logger } from '../../config/winston';

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

    JqueryChangeValueByID,

    naviGet,
    naviBack,
    naviForward,
    naviRefresh,

    popupClose

 } from '../../modules';

 const getElementById = async (driver: WebDriver, id: string, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
  
  const getElementByName = async (driver: WebDriver, name: string, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
  
  const getElementByXpath = async (driver: WebDriver, xpath: string, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
  

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
            logger.debug(Err)
            throw Error;
        }
    })

 })

