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

    JqChangeValueByID,
    JqSetAttribute,
    JqRemoveAttribute,
 } from '../../../modules';
  

 describe('Module jqueryHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeEach(async () => {
        driver = await getDriverHandler();
        await driver.get('https://testpages.herokuapp.com/styled/html5-form-test.html')
    })

    afterEach(async () => {
        await driver.quit()
    })

    test('JqChangeValueByID', async () => {
        try {
            let value = "teepo";
            await (await findElementById(driver,'email-field')).clear()
            await JqChangeValueByID(driver,'email-field',value);
            let text = await (await findElementById(driver,'email-field')).getAttribute('value');
            expect(text).toEqual(value)
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('JqSetAttribute', async () => {
        try {
            await JqSetAttribute(driver,'email-field',['disabled','true']);
            let bool = await (await findElementById(driver,'email-field')).getAttribute('disabled');
            expect(bool).toBe("true")
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

    test('JqRemoveAttribute', async () => {
        try {
            await JqSetAttribute(driver,'email-field',['disabled','true']);
            await JqRemoveAttribute(driver,'email-field','disabled');
            let bool = await (await findElementById(driver,'email-field')).getAttribute('disabled');
            expect(bool).toBeNull()
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

})