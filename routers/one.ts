import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();

// modules
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

 } from '../modules';

// middlewares
import { 
    timeIntervalMiddleware,
    httpLoggingMiddleware
 } from '../middlewares'

// logger
import {
    loggerHttp,
    loggerDebug,
    loggerError,
    loggerInfo 
    } from '../config/winston';

// node-json-db
import { db } from '../config/nodejsondb';
import { By } from 'selenium-webdriver';

// shortid
import shortid from 'shortid'

router.get('/',timeIntervalMiddleware,httpLoggingMiddleware, async function (req: Request, res: Response, next: NextFunction) {
    // 웹드라이버 설정
    let driver = await getDriverHandler();
    
    try {

        // 브라우저에 접속
        await driver.get('https://typo.tistory.com/')

        // 현재 주소 가져오기
        const text = await driver.getCurrentUrl();

        // 저장 데이터
        const savedata = {
            id : shortid.generate(),
            date : new Date,
            result : text
        }

        // 데이터베이스에 저장 
        db.push('/one[]', savedata);

        // log 저장
        loggerInfo.info(JSON.stringify(savedata))

        res.send({success: true, result : text});
    }
    catch(Err) {
        loggerError.info(JSON.stringify(Err))
        console.log(Err)
        driver.close();
        res.send({success: false, result : Err})
    }
});

export default router;