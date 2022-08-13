import express, { Request, Response, NextFunction } from 'express';
import {   
    loggerInfo,
    loggerError,
    loggerHttp,
    loggerDebug,
 } from '../config/winston'

interface LOGSTR {
    url : string;
    method : string;
    query? : Object;
    body? : Object;
    params? : Object;
}

export const httpLoggingMiddleware = async (req: Request, res: Response, next: NextFunction) => {

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
                logStr.params = req.params;
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
        loggerHttp.info(JSON.stringify(logStr))

        next();
    }
    catch (Err) {
        loggerError.info(Err)
        res.send({ success: false, result : "httpError" });
    }
}
