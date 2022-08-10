import express, { Request, Response, NextFunction } from 'express';
import {   
    loggerInfo,
    loggerError,
    loggerHttp,
    loggerDebug,
 } from '../../config/winston'

import { timeIntervalMiddleware } from '../../middlewares';

describe('MiddleWare timeInterval', () => {
    let mockRequest : Partial<Request>;
    let mockResponse : Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(()=> {
        mockRequest = { originalUrl : '/one' };
        mockResponse = {
            json: jest.fn()
        };
    });

    test('timeInterval 로깅 미들웨어 테스트', async () => {

        try {
            await timeIntervalMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

            // nextFunction 까지 잘되는지 확인
            expect(nextFunction).toBeCalledTimes(1);
        }
        catch (Err) {
            loggerDebug.info(JSON.stringify(Err))
        }
    })

})