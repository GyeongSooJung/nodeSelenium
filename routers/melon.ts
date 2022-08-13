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

    findElementsById,
    findElementsByName,
    findElementsByXpath,


    JqChangeValueByID,
    JqRemoveAttribute,

    naviGet,
    naviBack,
    naviForward,
    naviRefresh,

    popupClose,

 } from '../modules';

// middlewares
import { 
    timeIntervalMiddleware,
    httpLoggingMiddleware
 } from '../middlewares'

// logger
import {
    loggerError,
    loggerInfo 
    } from '../config/winston';

// node-json-db
import { db } from '../config/nodejsondb';
import { By, WebElement } from 'selenium-webdriver';

// interfaces
import {
    MusicDetail,
    MusicSummary
} from '../lib'

router.get('/song/:musicId',timeIntervalMiddleware,httpLoggingMiddleware, async function (req: Request, res: Response, next: NextFunction) {
    try {
        // params로 받아온 id (ex. 1660371089742 )
        let { musicId } = req.params;

        let result;

        if(!(await db.exists('/melon'))) {
            return res.send({success: false, result : "데이터가 존재하지 않습니다."})
        }
        else {
            
            //  id에 맞는 결과 받아옴
            await (await db.getData('/melon')).map((item : any, index : number) => {
                item.result.map((item : any, index: number) => {
                    if (item.id === parseInt(musicId)) {
                        result = item;
                        return;
                    }
                })
            })

            if(result === undefined) {
                res.send({success: false, result : "데이터가 존재하지 않습니다."})
            }
            else {
                res.send({success: true, result})
            }

        }
    }
    catch(Err) {
        loggerError.info(JSON.stringify(Err));
        console.log(Err);
        res.send({success: false, result : "시스템 에러"});
    }
})

router.get('/summary',timeIntervalMiddleware,httpLoggingMiddleware, async function (req: Request, res: Response, next: NextFunction) {
    // 웹드라이버 설정
    let driver = await getDriverHandler();

    let startTime = new Date();
    
    try {
        // 브라우저에 접속
        await driver.get('https://www.melon.com/chart/index.htm')

        const result : WebElement[] = await findElementsById(driver,'lst50')


        let AllArray : Array<{}> = [];
        let summaryArray : Array<{}> = [];

        let musicSummary : MusicSummary;
        let musicDetail : MusicDetail;

        for (var i = 1; i < result.length; i ++) {
            let ranking = await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[2]/div/span[1]`)).getText();
            let name = await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[6]/div/div/div[1]/span/a`)).getText();
            let singer = await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[6]/div/div/div[2]/a`)).getText();
            let album = await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[7]/div/div/div/a`)).getText();

            await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[7]/div/div/div/a`)).click();

            let publisher = await (await findElementByXpath(driver,`/html/body/div[1]/div[3]/div/div/div[2]/div/div[2]/div[2]/dl/dd[3]`)).getText();
            let agency = await (await findElementByXpath(driver,`/html/body/div[1]/div[3]/div/div/div[2]/div/div[2]/div[2]/dl/dd[4]`)).getText();

            await naviBack(driver);
            
            musicSummary = {
                ranking : parseInt(ranking),
                name : name,
                singer : singer,
                album : album
            };

            musicDetail = {
                publisher : publisher,
                agency : agency
            };

            AllArray.push({
                id: (new Date).getTime(),
                musicSummary : musicSummary,
                musicDetail: musicDetail
            });

            summaryArray.push({
                id: (new Date).getTime(),
                musicSummary : musicSummary,
            });
        }

        // db 저장 데이터
        const savedata = {
            id : (new Date).getTime(),
            date : new Date,
            time : (new Date()).getTime() - startTime.getTime(),
            result : AllArray
        }

        // response 데이터
        const responseData = {
            id : (new Date).getTime(),
            date : new Date,
            time : (new Date()).getTime() - startTime.getTime(),
            result : summaryArray
        }

        // 데이터베이스에 저장 
        await db.push('/melon[]', savedata);

        // log 저장
        loggerInfo.info(JSON.stringify(savedata));

        await driver.quit();

        res.send({success: true, result: responseData});
    }
    catch(Err) {
        loggerError.info(JSON.stringify(Err));
        console.log(Err);
        driver.quit();
        res.send({success: false, result : "시스템 에러"});
    }
})


router.get('/songs',timeIntervalMiddleware,httpLoggingMiddleware, async function (req: Request, res: Response, next: NextFunction) {
    // 웹드라이버 설정
    let driver = await getDriverHandler();

    let startTime = new Date();
    
    try {
        // 브라우저에 접속
        await driver.get('https://www.melon.com/chart/index.htm')

        const result : WebElement[] = await findElementsById(driver,'lst50')


        let array  : Array<{}> = [];

        let musicSummary : MusicSummary;
        let musicDetail : MusicDetail;

        for (var i = 1; i < result.length; i ++) {
            let ranking = await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[2]/div/span[1]`)).getText();
            let name = await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[6]/div/div/div[1]/span/a`)).getText();
            let singer = await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[6]/div/div/div[2]/a`)).getText();
            let album = await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[7]/div/div/div/a`)).getText();
            
            await (await findElementByXpath(driver,`/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[${i}]/td[7]/div/div/div/a`)).click();

            let publisher = await (await findElementByXpath(driver,`/html/body/div[1]/div[3]/div/div/div[2]/div/div[2]/div[2]/dl/dd[3]`)).getText();
            let agency = await (await findElementByXpath(driver,`/html/body/div[1]/div[3]/div/div/div[2]/div/div[2]/div[2]/dl/dd[4]`)).getText();

            await naviBack(driver);

            musicSummary = {
                ranking : parseInt(ranking),
                name : name,
                singer : singer,
                album : album
            }

            musicDetail = {
                publisher : publisher,
                agency : agency
            }

            array.push({
                id: (new Date).getTime(),
                musicSummary : musicSummary,
                musicDetail: musicDetail
            })
        }

        // 저장 데이터
        const savedata = {
            id : (new Date).getTime(),
            date : new Date,
            time : (new Date()).getTime() - startTime.getTime(),
            result : array
        }

        // 데이터베이스에 저장 
        await db.push('/melon[]', savedata);

        // log 저장
        loggerInfo.info(JSON.stringify(savedata));

        await driver.quit();

        res.send({success: true, result: savedata});
    }
    catch(Err) {
        loggerError.info(JSON.stringify(Err));
        console.log(Err);
        driver.quit();
        res.send({success: false, result : "시스템 에러"});
    }
});


export default router;