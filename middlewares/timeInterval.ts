import express, { Request, Response, NextFunction } from 'express';

const { logger } = require('../config/winston');

// node-json-db
import { db } from '../config/nodejsondb';

export const timeIntervalMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        // 접속 경로에서 '/' 뺀 문자열 
        let urlText = req.originalUrl.split('/')[1];

        // 데이터베이스 조회
        const data = db.getData('/');

        // 처음 크롤링 할 때는 key값 ( 데이터베이스 주소 )이 없는 상태이므로 패스
        // 라우터 경로에서 '/'를 뺀 값이랑 데이터베이스의 키 값이랑 같다.
        if(!Object.keys(data).includes(urlText)) {
            next()
        }
        // 데이터가 존재할 경우 시간을 현 시간과 비교함
        else {
            // 현재 시간
            let nowTime = new Date()
            let beforeTime = new Date(data[urlText].date)
            // 분 으로 계산한다. urlText 에서 데이터베이스 테이블 이름 가져옴 가져옴
            let diff = (nowTime.getTime() - beforeTime.getTime()) / (1000*60)
            // 전 시간과 비교하여 차이가 5분 미만일 때
            // if (diff < 5) {
            //     res.send({success: false, result: "5분 미만입니다."})
            // }
            // else {
                next();
            // }
        }
    }
    catch (Err) {
        console.log(Err)
        logger.error(Err)
        res.send({ success: false, result: "timeInterverError" });
    }
}