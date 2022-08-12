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

} from '../../../modules';

 // window type 선언
declare const window: typeof globalThis;

 describe('Module alertHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeEach(async () => {
        driver = await getDriverHandler();
        await driver.get('https://testpages.herokuapp.com/styled/alerts/alert-test.html')
    })

    afterEach(async () => {
        await driver.quit()
    })

    test('alert 테스트 ( alert 텍스트가 잘 나오는지 )', async () => {
        try {
            await (await findElementById(driver,'alertexamples')).click();

            // alert 창 뜰 때까지 기다림
            await driver.wait(until.alertIsPresent());

            // alert 로 드라이버 이동
            let alert = await driver.switchTo().alert();

            // alertText
            let alertText = await alert.getText();

            // 확인버튼 클릭
            await alert.accept();

            // 다시 원래 컨텐츠로 드라이버 이동
            await driver.switchTo().defaultContent();

            expect(alertText).toEqual('I am an alert box!');
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('prompt 테스트', async () => {
        try {
            await (await findElementById(driver,'promptexample')).click();

            // alert 창 뜰 때까지 기다림
            await driver.wait(until.alertIsPresent());

            // alert 로 드라이버 이동
            let alert = await driver.switchTo().alert();

            // alert text 사용하는 곳
            let alertText = await alert.getText();

            // 확인버튼 클릭
            await alert.accept();

            // 다시 원래 컨텐츠로 드라이버 이동
            await driver.switchTo().defaultContent();

            expect(alertText).toEqual('I prompt you');

        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })
})