// node-json-db
import { db } from '../../config/nodejsondb';

// logger
import { loggerError } from '../../config/winston';

export const expireHandler = async (dbPath: string) => {
    try {
        let nowTime = new Date(); // 현재 시간

        // 데이터 베이스 안 데이터들
        const datalist = await db.getData(dbPath);

        let index = 0; // 기준점이 되는 index

        // 데이터 매핑 및 시간 차이 계산해서 30분 지난 데이터는 삭제
        await datalist.data.map(async (item : any, index2: number) => {
            let beforeTime =  new Date(item.date); // 데이터들 저장된 시간
            let diff = (nowTime.getTime() - beforeTime.getTime()) / (1000*60); // 데이터들 시간 차이
            // 저장된 지 30분이 지나면 index 체크
            if(diff > 30) {
                index = index2;
            }
        })

         // 설정한 시간을 기준점으로 잡고  그 이전에 만든 데이터를 다 삭제한다. (앞에서부터 shift)
        for (let i = 0; i < index; i ++) {
            await db.delete(dbPath + '/data[0]');
        }
    }
    catch(Err) {
        loggerError.info(JSON.stringify(Err))
    }
}