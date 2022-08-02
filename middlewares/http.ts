import express, { Request, Response, NextFunction } from 'express';
const { logger } = require('../config/winston');

interface LOGSTR {
    url : string;
    method : string;
    query? : Object;
    body? : Object;
}

export const httpLoggingMiddleware = (req: Request, res: Response, next: NextFunction) => {

    let logStr: LOGSTR = {
        url : "",
        method: "",
        query: "",
        body: "",
    }

    try {
        // 접속 경로
        logStr.url = req.originalUrl;

        // 메소드
        logStr.method = req.method;

        switch (req.method) {
            case 'GET':
                logStr.query = req.query;
                break;
            case 'POST':
                logStr.body = req.body;
                break;
            case 'PATCH':
                logStr.body = req.body;
                break;
            case 'DELETE':
                logStr.query = req.query;
                break;
        }

        logger.http(JSON.stringify(logStr))

        next();
    }
    catch (Err) {
        logger.error(Err)
        res.send({ success: false });
    }
}
