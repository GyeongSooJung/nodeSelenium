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
    findElementsByClass,
    findElementsByTagName,
    findElementByClass,
    sleep,

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
import { By, TouchSequence, WebElement } from 'selenium-webdriver';

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

        if(!(await db.exists('/vibe'))) {
            return res.send({success: false, result : "데이터가 존재하지 않습니다."})
        }
        else {
            
            //  id에 맞는 결과 받아옴
            await (await db.getData('/vibe')).map((item : any, index : number) => {
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

    let AllArray  : Array<{}> = [];
    let summaryArray : Array<{}> = [];

    let musicSummary : MusicSummary;
    let musicDetail : MusicDetail;
    
    try {
        // 브라우저에 접속
        await driver.get('https://vibe.naver.com/chart/total');

        let result : WebElement[] = await findElementsByTagName(driver,'tr');

        for (var i = 1; i < result.length; i ++) {
            let ranking = await (await findElementByXpath(driver,`/html/body/div[3]/div[2]/div[1]/div[6]/div/table/tbody/tr[${i}]/td[2]`)).getText();
            let name = await (await findElementByXpath(driver,`/html/body/div[3]/div[2]/div[1]/div[6]/div/table/tbody/tr[${i}]/td[5]/a[1]`)).getText();
            let singer = await (await findElementByXpath(driver,`/html/body/div[3]/div[2]/div[1]/div[6]/div/table/tbody/tr[${i}]/td[5]/a[2]`)).getText();
            let album = await (await findElementByXpath(driver,`/html/body/div[3]/div[2]/div[1]/div[6]/div/table/tbody/tr[${i}]/td[5]/a[3]`)).getText();
            
            await (await findElementByXpath(driver,`/html/body/div[3]/div[2]/div[1]/div[6]/div/table/tbody/tr[${i}]/td[5]/a[3]`)).click();

            let publisher = await (await findElementByXpath(driver,`/html/body/div[3]/div[2]/div/div/div[2]/div[2]/ul/li[3]/span[2]`)).getText();
            let agency = await (await findElementByXpath(driver,`/html/body/div[3]/div[2]/div/div/div[2]/div[2]/ul/li[4]/span[2]`)).getText();

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
        await db.push('/vibe[]', savedata);

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

    let array : Array<{}> = [];

    let musicSummary : MusicSummary;
    let musicDetail : MusicDetail;

    let publisher = "";
    let agency = "";
    
    try {
        // 브라우저에 접속
        await driver.get('https://vibe.naver.com/chart/total');

        await (await findElementByXpath(driver,'//*[@id="app"]/div[2]/div/div/a[2]')).click();

        // await driver.executeScript("window.scrollTo(0,document.body.scrollHeight)");

        // await (await findElementByXpath(driver,'//*[@id="content"]/div[5]/a')).click()

        let result : WebElement[] = await findElementsByTagName(driver,'tr');

        // 스크롤을 위한 클래스
        // let touch : TouchSequence = new TouchSequence(driver);

        // await driver.executeScript("window.scrollTo(0,0)");

        for (var i = 1; i < result.length; i ++) {

            // 스크롤 내리기 (tr의 height 만큼)
            if(i % 8 === 0) {
                await driver.executeScript("window.scrollBy(0,"+String(66 * 8)+")");
            }
            // if(i % 8 === 0) {
            //     touch.scroll({x: 0, y: 66 * 8})
            // }
            

            let ranking = await (await findElementByXpath(driver,`/html/body/div/div/div/div[3]/div/div[4]/div[2]/div/table/tbody/tr[${i}]/td[3]/span`)).getText();
            let name = await (await findElementByXpath(driver,`/html/body/div/div/div/div[3]/div/div[4]/div[2]/div/table/tbody/tr[${i}]/td[4]/div[1]/span/a`)).getText();
            let singer = await (await findElementByXpath(driver,`/html/body/div/div/div/div[3]/div/div[4]/div[2]/div/table/tbody/tr[${i}]/td[5]/span/span/span/a/span`)).getText();
            let album = await (await findElementByXpath(driver,`/html/body/div/div/div/div[3]/div/div[4]/div[2]/div/table/tbody/tr[${i}]/td[6]/a`)).getText();
            
            await (await findElementByXpath(driver,`/html/body/div/div/div/div[3]/div/div[4]/div[2]/div/table/tbody/tr[${i}]/td[6]/a`)).click();

            // 팝업 닫기(처음에만)
            if (i === 1) {
                await (await findElementByXpath(driver,`/html/body/div/div/div/div[3]/div/div[1]/div[1]/div[2]/div[2]/div/div[1]/span[3]/a/span/a`)).click();
            }

            // 더보기 버튼 나올 때 까지 기다림
            await sleep(500)

            // 더보기 클릭 (발매사, 기획사가 없는 노래도 있음)
            try{
                await (await findElementByXpath(driver,`//*[@id="content"]/div[1]/div[1]/div[2]/div[1]/div[2]/div/a`)).click();

                publisher = await (await findElementByXpath(driver,`/html/body/div/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td`)).getText();
                agency = await (await findElementByXpath(driver,`/html/body/div/div[2]/div/div/div[2]/div/table/tbody/tr[2]/td`)).getText();
            } catch(Err) {

            }
            
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

            array.push({
                id: (new Date).getTime(),
                musicSummary : musicSummary,
                musicDetail: musicDetail
            });
            console.log({
                id: (new Date).getTime(),
                musicSummary : musicSummary,
                musicDetail: musicDetail
            })

            await sleep(1000)

        }

        // 저장 데이터
        const savedata = {
            id : (new Date).getTime(),
            date : new Date,
            time : (new Date()).getTime() - startTime.getTime(),
            result : array
        }

        // 데이터베이스에 저장 
        await db.push('/vibe[]', savedata);

        // log 저장
        loggerInfo.info(JSON.stringify(savedata));

        await driver.quit();

        res.send({success: true, result: savedata});
    }
    catch(Err) {
        loggerError.info(JSON.stringify(Err));
        console.log(Err);
        await driver.quit();
        res.send({success: false, result : "시스템 에러"});
    }
});


export default router;