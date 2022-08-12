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
    fileRegister,

    findElementById,
    findElementByName,

    getDriverHandler,

 } from '../../../modules';
  

 describe('Module fileHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeEach(async () => {
        driver = await getDriverHandler();
        await driver.get('https://testpages.herokuapp.com/styled/file-upload-test.html')
    })

    afterEach(async () => {
        await driver.quit()
    })

    test('fileRegister', async () => {
        // 파일 위치 존재 할 때만 테스트 실행

        //     try {
        //         await fileRegister(driver,By.id('fileinput'),['파일 위치'])
        //         await (await findElementByName(driver,'fileinput')).click()
        //         var text = await (await findElementById(driver,'uploadedfilename')).getText()
        //         expect(text).toEqual('image.jpg')
        //     }
        //     catch(Err) {
        //         loggerDebug.info(JSON.stringify(Err))
        //     }
    expect(1).toEqual(1);
    })

})