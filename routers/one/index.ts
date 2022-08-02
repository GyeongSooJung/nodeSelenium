import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();

// middlewares
import { timeIntervalMiddleware,httpLoggingMiddleware } from '../../middlewares';

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

    JqueryChangeValueByID,

    naviGet,
    naviBack,
    naviForward,
    naviRefresh,

    popupClose

 } from '../../modules';

// logger
import { logger } from '../../config/winston';

// node-json-db
import { db } from '../../config/nodejsondb';

router.get('/',timeIntervalMiddleware,httpLoggingMiddleware, async function (req: Request, res: Response, next: NextFunction) {
    try {
        let startTime = new Date().getTime();
        // 웹드라이버 설정
        let driver = await getDriverHandler();

        // 브라우저에 접속
        await driver.get('https://typo.tistory.com/');

        // 시간 가져오기
        const date = new Date();

        // 현재 주소 가져오기
        const text = await driver.getCurrentUrl();
        
        // 데이터베이스에 저장
        db.push('/one',{
            date : date,
            text : text
        });

        // 데이터베이스 내용 확인
        var data = db.getData('/');
        console.log("add data : ",data);

        // 브라우저 닫기
        driver.close();
        
        // 검색한 데이터는 로그로 남겨둔다.
        let endTime = new Date().getTime();
        
        // 날짜, 크롤링데이터, 걸린시간
        logger.info(JSON.stringify({date: new Date, data : text, time : endTime - startTime}));

        res.send({success: true, result : text});
    }
    catch(Err) {
        logger.error(Err)
        console.log(Err)
        res.send({success: false, result : Err})
    }
});

export default router;