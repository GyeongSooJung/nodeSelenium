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
    findElementsById,
    findElementByName,
    findElementByXpath,

    findElementByClass,
    findElementsByName,
    findElementsByXpath,
    findElementsByClass

 } from '../../../modules';
  

 describe('Module findElementHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeAll(async () => {
        driver = await getDriverHandler();
        driver.get('https://testpages.herokuapp.com/styled/find-by-playground-test.html')
    })

    afterAll(async () => {
        await driver.close()
    })

    test('findElementById', async () => {
        try {
            let text = await (await findElementById(driver,'p1')).getText();
            expect(text).toEqual('This is a paragraph text')
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    });

    test('findElementByName', async () => {
        try {
            let text = await (await findElementByName(driver,'pName1')).getText();
            expect(text).toEqual('This is a paragraph text')
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    });

    test('findElementByXpath', async () => {
        try {
            let text = await (await findElementByXpath(driver,'//*[@id="p1"]')).getText();
            expect(text).toEqual('This is a paragraph text')
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    });

    test('findElementByClass', async () => {
        try {
            let text = await (await findElementByClass(driver,'explanation')).getText();
            expect(text).toEqual('This is a set of nested elements. There are various ways to locate each of the elements. Challenge yourself to find as many ways of locating elements as possible.')
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    });

})


describe('Module findElementsHandler', () => {
    // 웹드라이버 설정
    let driver : WebDriver;

    beforeAll(async () => {
        driver = await getDriverHandler();
        await driver.get('https://testpages.herokuapp.com/styled/find-by-playground-test.html')
    })

    afterAll(async () => {
        await driver.close()
    })

    test('findElementsById', async () => {
        try {
            let text = await (await findElementsById(driver,'p1'))[0].getText();
            expect(text).toEqual('This is a paragraph text')
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    });

    test('findElementsByName', async () => {
        try {
            let text = await (await findElementsByName(driver,'pName1'))[0].getText();
            expect(text).toEqual('This is a paragraph text')
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    });

    test('findElementsByXpath', async () => {
        try {
            let text = await (await findElementsByXpath(driver,'//*[@id="p1"]'))[0].getText();
            expect(text).toEqual('This is a paragraph text')
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    });

    test('findElementsByClass', async () => {
        try {
            let text = await (await findElementsByClass(driver,'explanation'))[0].getText();
            expect(text).toEqual('This is a set of nested elements. There are various ways to locate each of the elements. Challenge yourself to find as many ways of locating elements as possible.');
        }
        catch(Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
        });
})