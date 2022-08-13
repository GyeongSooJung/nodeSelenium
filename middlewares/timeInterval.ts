import express, { Request, Response, NextFunction } from 'express';

const {   
    loggerInfo,
    loggerError,
    loggerHttp,
    loggerDebug,
 } = require('../config/winston');

// node-json-db
import { db } from '../config/nodejsondb';

// module
import { expireHandler } from '../modules';

export const timeIntervalMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // url
        let url = req.originalUrl;


        // 전체 데이터베이스 조회
        const data = await db.getData('/');

        // 처음 크롤링 할 때는 key값 ( 데이터베이스 주소 )이 없는 상태이므로 패스
        // 라우터 경로에서 '/'를 뺀 값이랑 데이터베이스의 키 값이랑 같다.
        if(!Object.keys(data).includes(url.split('/')[1]) || !(await db.getData(url + "[-1]"))) {
            // next();
        }
        // 데이터가 존재할 경우 시간을 현 시간과 비교함
        else {
            expireHandler(url);
            // 현재 시간
            let nowTime = new Date()
            let beforeTime = new Date(await (await db.getData(url + "[-1]")).date); // 제일 최신 데이터의 조회 시간
            let diff = (nowTime.getTime() - beforeTime.getTime()) / (1000*60); // 분 으로 계산한다.
            // 전 시간과 비교하여 차이가 1분 미만일 때
            // if (diff < 1) {
            //     res.send({success: false, result: "5분 미만입니다."})
            // }
            // else {
            //     next();
            // }
        }
        next();
    }
    catch (Err) {
        console.log("Err : ",Err)
        loggerError.info(Err)
        res.send({ success: false, result: "timeInterverError" });
    }
}