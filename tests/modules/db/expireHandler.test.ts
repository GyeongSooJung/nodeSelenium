import express, { Request, Response, NextFunction } from 'express';

// node-json-db
import { db } from '../../../config/nodejsondb';

// logger
import { loggerDebug } from '../../../config/winston';
import { expireHandler } from '../../../modules';

describe('Module expireHandler', () => {
    let dbPath : string;

    beforeEach(()=> {
        dbPath = '/one'
    });

    test('30분 지난 데이터 삭제 및 확인', async () => {
        try {
            let nowTime = new Date(); // 현재 시간

            // 30분 지난 데이터 삭제
            await expireHandler(dbPath);

            // 데이터 베이스 안 데이터들
            const datalist = await db.getData(dbPath);

            let index = 0; // 기준점이 되는 index

            // 데이터 매핑 및 시간 차이 계산해서 30분 지난 데이터는 삭제
            await datalist.map(async (item : any, index2: number) => {
                let beforeTime =  new Date(item.date); // 데이터들 저장된 시간
                let diff = (nowTime.getTime() - beforeTime.getTime()) / (1000*60); // 데이터들 시간 차이
                // 저장된 지 30분이 지나면 index 체크
                if(diff > 30) {
                    index = index2;
                }
            })

            // ----- 30분 지난 데이터 없는지 확인 -----
            expect(index).toEqual(0);

        }
        catch(Err) {
            console.log("Err : ",Err)
            loggerDebug.info(JSON.stringify(Err))
        }
    })
})