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
    findElementByCss,

    JqChangeValueByID,
    JqRemoveAttribute,

    naviGet,
    naviBack,
    naviForward,
    naviRefresh,

    popupClose,

    sleep

 } from '../modules';

 // middlewares
import { 
    timeIntervalMiddleware,
    httpLoggingMiddleware
 } from '../middlewares'

// logger
import {
    loggerInfo,
    loggerError,
    loggerHttp,
    loggerDebug,
 } from '../config/winston';

// node-json-db
import { db } from '../config/nodejsondb';
import { By } from 'selenium-webdriver';

// shortid
import shortid from 'shortid'

router.post('/',timeIntervalMiddleware,httpLoggingMiddleware, async function (req: Request, res: Response, next: NextFunction) {
    // 웹드라이버 설정
    let driver = await getDriverHandler();
    try {
        let startTime = new Date().getTime();

        const body = req.body;

        const derPath = "C:/Users/Administrator/Downloads/Cert/Cert/signCert.der"
        const keyPath = "C:/Users/Administrator/Downloads/Cert/Cert/signPri.key"
        const certPassword = "parksy6411##"

        const {
            GwanriNo,

            GYBYN,
            SJBYN,
            NPSYN,
            HLTHYN,

            GeunrojaName,
            GeunrojaRgNo1,
            GeunrojaRgNo2,

            MmAvgBosu,
            ChwideukDt,
            JuSojeongGeunroTm,

            GyeYakJikYN,
            GyeyakToDt,

            JikJongCd,
            JikJongItem,
            NPSChwideukBuho,
            NPSChwideukMMNapbuYN,
            HLTHYNChwideukBuho

        } = body;

        // 브라우저에 접속
        await driver.get('https://total.comwel.or.kr/');

        await popupClose(driver);

        await (await findElementById(driver,'mf_wfm_header_btn_login')).click();
        await (await findElementById(driver, 'mf_wfm_content_TabContent1_tab_tabs3_tabHTML')).click();
        await (await findElementByXpath(driver, '/html/body/div[2]/div[2]/div[2]/div[3]/div/div/div[2]/div/div[3]/div[1]/div/span[2]/label')).click();

        // 사업자 우리꺼 입력
        await (await findElementById(driver,'mf_wfm_content_drno3_1')).sendKeys('782')
        await (await findElementById(driver,'mf_wfm_content_drno3_2')).sendKeys('85')
        await (await findElementById(driver,'mf_wfm_content_drno3_3')).sendKeys('00389')

        // 공인인증서 로그인 버튼 클릭
        await (await findElementById(driver,'mf_wfm_content_btn_login3')).click();

        // 인증서 찾기버튼 클릭
        await (await findElementById(driver,'xwup_media_memorystorage')).click();

        // 파일 등록
        await fileRegister(driver,By.id('xwup_openFile'),[derPath,keyPath])

        // 비밀번호 입력
        await (await findElementById(driver,'xwup_inputpasswd_tek_input1')).sendKeys(certPassword)

        // 확인버튼 클릭
        await (await findElementById(driver,'xwup_ok')).click()

        // 처음 시작 팝업 닫기
        await (await findElementById(driver,'mf_wfm_content_samuInfoPopup_close')).click()

        // 민원접수 버튼 클릭
        await (await findElementById(driver,'mf_wfm_header_gen_firstGenerator_1_gen_SecondGenerator_0_btn_menu2_Label')).click()

        // 자격관리 버튼 클릭
        await (await findElementById(driver,'mf_wfm_side_gen_firstGenerator_side_4_title')).click()

        // 근로자 자격취득신고 버튼 클릭
        await (await findElementById(driver,'mf_wfm_side_gen_firstGenerator_side_4_gen_SecondGenerator_side_0_subtitle')).click()

        // 사업장 관리번호 입력
        await (await findElementById(driver,'mf_wfm_content_maeGwanriNo')).sendKeys(GwanriNo)

        // 사업자관리번호 입력했을 때 전에 미리 저장해둔 정보가 있으면 지움
        try {
            alertCloseAccept(driver);
            (await findElementByXpath(driver,'/html/body/div[2]/div[2]/div[2]/div/div[16]/div/span[5]/input')).click();
        }
        catch(Err) {
            console.log(Err);
        }

        // 주민등록번호 입력
        await (await findElementById(driver,'mf_wfm_content_maeRgno')).sendKeys(GeunrojaRgNo1+GeunrojaRgNo2)

        sleep(1000)

        // 주민등록번호 돋보기 클릭
        await (await findElementById(driver,'mf_wfm_content_Button00')).click();
        
        // 이미 신고된 이력이 있으면 결과 반환함.
        try{
            var text = await (await findElementByXpath(driver,'//*[@class="w2textarea w2textarea_readonly"]')).getAttribute('value');
            return res.send({success: false, result : text})
        }
        catch(Err) {
            console.log("신고 이력 없음 ")
        }

        // 근로자 이름 입력
        await (await findElementById(driver,'mf_wfm_content_edtNm')).sendKeys(GeunrojaName);

        let MmAvgBosuBoolean = true

        if(GYBYN) {
            if( (await (await findElementById(driver,'mf_wfm_content_chkGybyn1_input_0')).getAttribute('checked')) === 'false' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkGybyn1"]/span/label')).click()
            }

            // 월평균 보수
            if(MmAvgBosuBoolean === true) {
                await (await findElementById(driver,'mf_wfm_content_edtGyBosu')).sendKeys(MmAvgBosu)
                MmAvgBosuBoolean = false;
            }

            // 취득일
            await (await findElementById(driver,'mf_wfm_content_calGyChwideukDt_input')).sendKeys(ChwideukDt)

            // 직종부호 찾기
            await (await findElementById(driver,'mf_wfm_content_btnSearchGyJikjong')).click()
            await (await findElementById(driver,'mf_wfm_content_WZ0111_P01_wframe_maeCodeNm')).sendKeys(JikJongItem)
            await (await findElementById(driver,'mf_wfm_content_WZ0111_P01_wframe_btnSearch')).click()

            await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_WZ0111_P01_wframe_GridMain_cell_0_0"]/button')).click()

            // 소정근로시간
            await (await findElementById(driver,'mf_wfm_content_edtGySojeongGeunro')).sendKeys(String(JuSojeongGeunroTm))

            // 계약직 여부
            if( GyeYakJikYN === 'Y') {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_calGyGyeyakJik"]/span[1]/label')).click()
                await (await findElementByXpath(driver,'/html/body/div[6]/div[2]/div[1]/div/div/div[2]/input[1]')).click()
                await (await findElementById(driver,'mf_wfm_content_calGyGyeyakToDt_input')).sendKeys(GyeyakToDt)
            }
            else {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_calGyGyeyakJik"]/span[2]/label')).click()
            }

        }
        else {
            if( (await (await findElementById(driver,'mf_wfm_content_chkGybyn1_input_0')).getAttribute('checked')) === 'true' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkGybyn1"]/span/label')).click()
            }
        }

        if(SJBYN) {
            if( (await (await findElementById(driver,'mf_wfm_content_chkSjbyn1_input_0')).getAttribute('checked')) === 'false' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkSjbyn1"]/span/label')).click()
            }

            // 월평균 보수
            // await (await findElementById(driver,'mf_wfm_content_edtSjBosu')).sendKeys(MmAvgBosu)

            // 취득일
            await (await findElementById(driver,'mf_wfm_content_calSjChwideukDt_input')).sendKeys(ChwideukDt)

            // 소정근로시간
            await (await findElementById(driver,'mf_wfm_content_edtSjSojeongGeunro')).sendKeys(String(JuSojeongGeunroTm))

            // 직종부호
            await (await findElementById(driver,'mf_wfm_content_btnSearchSjJikjong')).click()
            await (await findElementById(driver,'mf_wfm_content_WZ0111_P01_wframe_maeCodeNm')).sendKeys(JikJongItem)
            await (await findElementById(driver,'mf_wfm_content_WZ0111_P01_wframe_btnSearch')).click()

            await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_WZ0111_P01_wframe_GridMain_cell_0_0"]/button')).click()

        }
        else {
            if( (await (await findElementById(driver,'mf_wfm_content_chkSjbyn1_input_0')).getAttribute('checked')) === 'true' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkSjbyn1"]/span/label')).click()
            }
        }

        if(NPSYN) {
            if( (await (await findElementById(driver,'mf_wfm_content_chkNpsyn1_input_0')).getAttribute('checked')) === 'false' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkNpsyn1"]/span/label')).click()
            }

            // 월평균 보수
            if(MmAvgBosuBoolean === true) {
                await (await findElementById(driver,'mf_wfm_content_edtNpsBosu')).sendKeys(MmAvgBosu)
                MmAvgBosuBoolean = false;
            }

            // 취득일
            await (await findElementById(driver,'mf_wfm_content_calNpsChwideukDt_input')).sendKeys(ChwideukDt)

            // 취득월 납부여부
            if(NPSChwideukMMNapbuYN === 'Y') {
                await (await findElementById(driver,'mf_wfm_content_comChwideukNapbu_input_0')).sendKeys('희망')
            }
            else {
                await (await findElementById(driver,'mf_wfm_content_comChwideukNapbu_input_0')).sendKeys('미희망')
            }

             // 취득 부호
             await (await findElementByXpath(driver,"//*[@id='mf_wfm_content_comNpsChwideuk_input_0']/option["+String(parseInt(NPSChwideukBuho) + 2)+"]")).click()
             
        }
        else {
            if( (await (await findElementById(driver,'mf_wfm_content_chkNpsyn1_input_0')).getAttribute('checked')) === 'true' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkNpsyn1"]/span/label')).click()
            }
        }

        if(HLTHYN) {
            if( (await (await findElementById(driver,'mf_wfm_content_chkNhicyn1_input_0')).getAttribute('checked')) === 'false' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkNhicyn1"]/span/label')).click()
            }

            // 월평균 보수
            // await (await findElementById(driver,'mf_wfm_content_edtNhicBosu')).sendKeys(MmAvgBosu)

            // 취득일
            await (await findElementById(driver,'mf_wfm_content_calNhicChwideukDt_input')).sendKeys(ChwideukDt)

            // 취득 부호
            await (await findElementByXpath(driver,"//*[@id='mf_wfm_content_comNhicChwideuk_input_0']/option["+String(parseInt(HLTHYNChwideukBuho) + 2)+"]")).click()

            // 피부양자 신청
            await (await findElementByXpath(driver,'/html/body/div[2]/div[2]/div[2]/div/div[15]/table/tbody/tr[2]/td[4]/div/span[2]/label')).click()

        }
        else {
            if( (await (await findElementById(driver,'mf_wfm_content_chkNhicyn1_input_0')).getAttribute('checked')) === 'true' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkNhicyn1"]/span/label')).click()
            }
        }

        // 대상자 추가 버튼 클릭
        await (await findElementByXpath(driver,"/html/body/div[2]/div[2]/div[2]/div/div[16]/div/span[3]/input")).click()

        // 신고자료 검증 클릭
        await (await findElementByXpath(driver,"/html/body/div[2]/div[2]/div[2]/div/div[23]/span[3]/input")).click()

        // 신고 검증 이상유무 확인
        try{
            var text = await (await findElementByXpath(driver,'//*[@class="w2textarea w2textarea_readonly"]')).getAttribute('value');
            return res.send({success: false, result : text})
        }
        catch(Err) {
            console.log("신고 검증 이상 없음 ")
        }

        // 접수 버튼 클릭
        // await (await findElementById(driver,'mf_wfm_content_btnJeopsu')).click()

        // 접수 확인 클릭
        // await (await findElementByXpath(driver,'/html/body/div[6]/div[2]/div[1]/div/div/div[2]/input[1]')).sendKeys(ChwideukDt)

        // 브라우저 닫기
        driver.close();
        
        // 검색한 데이터는 로그로 남겨둔다.
        let endTime = new Date().getTime();
        
        // 날짜, 크롤링데이터, 걸린시간
        loggerInfo.info(JSON.stringify({date: new Date, time : endTime - startTime}));

        res.send({success: true});
    }
    catch(Err) {
        loggerError.info(Err)
        console.log(Err)
        // driver.close()
        res.send({success: false, result : '잠시 후에 다시 시도해주세요'})
    }
});

export default router;