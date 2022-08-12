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

    addCookie,
    getOneCookie,
    getAllCookie,
    deleteOneCookie,

    findElementById,
    findElementByName,

 } from '../../../modules';
  

 describe('Module cookieHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeEach(async () => {
        driver = await getDriverHandler();
        await driver.get('https://testpages.herokuapp.com/styled/cookies/adminlogin.html');

        // 로그인 및 쿠키생성
        await (await findElementByName(driver,'username')).sendKeys('Admin');
        await (await findElementByName(driver,'password')).sendKeys('AdminPass');
        await (await findElementById(driver,'login')).click();
    },15000)

    afterEach(async () => {
        await driver.quit()
    })

    test('쿠키 추가하기', async () => {
        try {
            // 쿠키추가
            await addCookie(driver,{name : "name", value : "teepo"});

            // 쿠키 가져오기
            const cookies = (await driver.manage().getCookie('name')).value;

            // 쿠키 확인
            expect(cookies).toEqual('teepo');
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('쿠키 하나 가져오기', async () => {
        try {
            // 쿠키 가져오기
            const result = await getOneCookie(driver,'loggedin');

            // 쿠키 확인
            expect(result.value).toEqual('Admin');
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('쿠키 전부 가져오기', async () => {
        try {
            // 쿠키 가져오기
            const result = await getAllCookie(driver);

            // 쿠키 확인
            expect(result[0].value).toEqual('Admin');
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('쿠키 하나 지우기', async () => {
        try {
            // 쿠키 삭제하기
            await deleteOneCookie(driver,'loggedin');

            // 쿠키 확인
            const result = await getAllCookie(driver);

            // 쿠키가 없어졌는지 확인
            expect(result.length).toEqual(0);
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('쿠키 전부 지우기', async () => {
        try {
            // 쿠키 삭제하기
            await deleteOneCookie(driver,'loggedin');

            // 쿠키 확인
            const result = await getAllCookie(driver);

            // 쿠키가 없어졌는지 확인
            expect(result.length).toEqual(0);
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }

    })

})