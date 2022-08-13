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
// import { db } from '../../config/nodejsondb';

import { 
    getDriverHandler,

    findElementsById

 } from '../../modules';
  

 describe('GET /one', () => {

    // 웹드라이버 설정
    let driver : WebDriver;
    let text : string;

    let url = 'https://www.melon.com/chart/index.htm'

    beforeEach(async () => {
        driver = await getDriverHandler();

        // 브라우저에 접속
        await driver.get(url);

        // 현재 주소 가져오기
        text = await driver.getCurrentUrl();
    })

    afterAll(async () => {
        await driver.quit()
    })

    test('url 잘 뜨는지 확인', async () => {
        try {
            // test
            expect(text).toEqual(url)
        }
        catch(Err) {
            console.log(Err)
            loggerDebug.info(Err)
            throw Error;
        }
    })

    test('list 잘 가져오는지 테스트', async () => {
        const result = await findElementsById(driver,'lst50')

        console.log(result)
    })

 })

