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

 } from '../../modules';

 // middlewares
import { 
    timeIntervalMiddleware,
    httpLoggingMiddleware
 } from '../../middlewares'

// logger
import {
    loggerInfo,
    loggerError,
    loggerHttp,
    loggerDebug,
 } from '../../config/winston';

// node-json-db
import { db } from '../../config/nodejsondb';
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

            GYBYN, // 고용보험여부
            SJBYN, // 산재보험여부
            NPSYN, // 국민연금여부
            HLTHYN, // 건강보험여부

            GeunrojaName, // 이름
            GeunrojaRgNo1, // 주민번호 앞자리
            GeunrojaRgNo2, // 주민번호 뒷자리

            SangsilDt, // 상실일

            DBosuChongak, // 당해 보수총액
            DSanjengMM, // 당해 근무개월

            JBosuChongak, // 전년 보수총액
            JSanjengMM, // 전년 근무개월

            SangsilSayu, // 상실사유
            SangsilSayuDetail, // 구체 상실사유

            HLTHSangsilBuhoCd, // 건강보험 상실부호
            NPSSangsilBuhoCd // 국민연금 상실부호

        } = body;

        console.log("body : ",body)

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

        // 근로자 자격상실신고 버튼 클릭
        await (await findElementById(driver,'mf_wfm_side_gen_firstGenerator_side_4_gen_SecondGenerator_side_1_subtitle')).click()

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
        await (await findElementById(driver,'mf_wfm_content_maeRgno')).click()

        await sleep(1)

        // await JqueryChangeValueByID(driver,'mf_wfm_content_maeRgno',GeunrojaRgNo1+GeunrojaRgNo2)
        await (await findElementByXpath(driver,'/html/body/div[2]/div[2]/div[2]/div/div[5]/div[3]/div[1]/table/tbody/tr[2]/td[3]/div/input')).sendKeys(GeunrojaRgNo1+GeunrojaRgNo2)

        await sleep(2000)

        // 근로자 이름 입력
        await JqRemoveAttribute(driver,'mf_wfm_content_edtNm','readonly')
        await JqRemoveAttribute(driver,'mf_wfm_content_edtNm','disabled')
        await (await findElementById(driver,'mf_wfm_content_edtNm')).sendKeys(GeunrojaName);

        if(GYBYN) {
            if( (await (await findElementById(driver,'mf_wfm_content_chkGybyn_input_0')).getAttribute('checked')) === 'false' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkGybyn"]/span/label')).click()
            }

            // 상실일
            await (await findElementById(driver,'mf_wfm_content_carGybSangsilDt_input')).sendKeys(SangsilDt)

            // 당해 보수총액
            await JqRemoveAttribute(driver,'mf_wfm_content_edtGybDyBosuChongak','disabled');
            await (await findElementById(driver,'mf_wfm_content_edtGybDyBosuChongak')).sendKeys(DBosuChongak)

            // 상실사유(구분코드)
            await (await findElementByXpath(driver,"//*[@id='mf_wfm_content_comGybSangsilSayuFgCd_input_0']/option["+String(parseInt(SangsilSayu) + 1)+"]")).click()

            await sleep(1000);

            // 상실사유(구체사유)
            await (await findElementByXpath(driver,"//*[@id='mf_wfm_content_comGybSangsilSayuFgDetail_input_0']/option["+String(parseInt(SangsilSayuDetail) + 1)+"]")).click()

            if(parseInt(SangsilSayu) === 0 && parseInt(SangsilSayuDetail) === 8) {
                await JqRemoveAttribute(driver,'mf_wfm_content_edtGybGuchejeokSangsilSayu','disabled'); 
                (await findElementById(driver,'mf_wfm_content_edtGybGuchejeokSangsilSayu')).sendKeys('자진 퇴사')
            }
        }
        else {
            if( (await (await findElementById(driver,'mf_wfm_content_chkGybyn_input_0')).getAttribute('checked')) === 'true' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkGybyn"]/span/label')).click()
            }
        }

        if(SJBYN) {
            if( (await (await findElementById(driver,'mf_wfm_content_chkSjbyn_input_0')).getAttribute('checked')) === 'false' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkSjbyn"]/span/label')).click()
            }
            // 상실일
            await (await findElementById(driver,'mf_wfm_content_carSjbSangsilDt_input')).sendKeys(SangsilDt)

        }
        else {
            if( (await (await findElementById(driver,'mf_wfm_content_chkSjbyn_input_0')).getAttribute('checked')) === 'true' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkSjbyn"]/span/label')).click()
            }
        }

        if(NPSYN) {
            if( (await (await findElementById(driver,'mf_wfm_content_carNpsSangsilDt_input')).getAttribute('checked')) === 'false' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkNpsbyn"]/span/label')).click()
            }
            // 상실일
            await (await findElementById(driver,'mf_wfm_content_carGybSangsilDt_input')).sendKeys(SangsilDt);

            // 국민연금 상실부호
            await (await findElementByXpath(driver,"//*[@id='mf_wfm_content_comNpsSangsilBuhoCd_input_0']/option["+String(parseInt(NPSSangsilBuhoCd) + 1)+"]")).click()
        }
        else {
            if( (await (await findElementById(driver,'mf_wfm_content_chkNhicbyn_input_0')).getAttribute('checked')) === 'true' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkNpsbyn"]/span/label')).click()
            }
        }

        if(HLTHYN) {
            if( (await (await findElementById(driver,'mf_wfm_content_chkNhicbyn_input_0')).getAttribute('checked')) === 'false' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkNhicbyn"]/span/label')).click()
            }

            // 상실일
            await (await findElementById(driver,'mf_wfm_content_carNhicSangsilDt_input')).sendKeys(SangsilDt)

            // 건강보험 상실부호
            await (await findElementByXpath(driver,"//*[@id='mf_wfm_content_comNhicSangsilBuhoCd_input_0']/option["+String(parseInt(NPSSangsilBuhoCd) + 1)+"]")).click()
            
            // 당해 보수총액
            await (await findElementById(driver,'mf_wfm_content_edtNhicDyBosuChongak')).sendKeys(DBosuChongak)

            // 전년 보수총액
            await (await findElementById(driver,'mf_wfm_content_edtNhicBef1BosuChongak')).sendKeys(JBosuChongak)

            // 당해 근무개월
            await (await findElementById(driver,'mf_wfm_content_edtNhicDySanjengMmCnt')).sendKeys(DSanjengMM)
            
            // 전년 근무개월
            await (await findElementById(driver,'mf_wfm_content_edtNhicBef1SanjengMmCnt')).sendKeys(JSanjengMM)

        
        }
        else {
            if( (await (await findElementById(driver,'mf_wfm_content_chkNhicyn1_input_0')).getAttribute('checked')) === 'true' ) {
                await (await findElementByXpath(driver,'//*[@id="mf_wfm_content_chkNhicbyn"]/span/label')).click()
            }
        }

        
        // 주민등록번호 돋보기 클릭
        await (await findElementById(driver,'mf_wfm_content_btnGeunrojaSearch')).click();
        
        // 이미 신고된 이력이 있으면 결과 반환함.
        try{
            var text = await (await findElementByXpath(driver,'//*[@class="w2textarea w2textarea_readonly"]')).getAttribute('value');
            return res.send({success: false, result : text})
        }
        catch(Err) {
            console.log("신고 이력 없음 ")
        }

        // 대상자 추가 버튼 클릭
        // await (await findElementByXpath(driver,"/html/body/div[2]/div[2]/div[2]/div/div[16]/div/span[3]/input")).click()

        // 신고자료 검증 클릭
        // await (await findElementByXpath(driver,"/html/body/div[2]/div[2]/div[2]/div/div[23]/span[3]/input")).click()

        // 신고 검증 이상유무 확인
        // try{
        //     var text = await (await findElementByXpath(driver,'//*[@class="w2textarea w2textarea_readonly"]')).getAttribute('value');
        //     return res.send({success: false, result : text})
        // }
        // catch(Err) {
        //     console.log("신고 검증 이상 없음 ")
        // }

        // 접수 버튼 클릭
        // await (await findElementById(driver,'mf_wfm_content_btnJeopsu')).click()

        // 접수 확인 클릭
        // await (await findElementByXpath(driver,'/html/body/div[6]/div[2]/div[1]/div/div/div[2]/input[1]')).sendKeys(ChwideukDt)

        // 브라우저 닫기
        // driver.close();
        
        // 검색한 데이터는 로그로 남겨둔다.
        let endTime = new Date().getTime();
        
        // 날짜, 크롤링데이터, 걸린시간
        loggerDebug.info(JSON.stringify({url : req.originalUrl,date: new Date, time : endTime - startTime}));

        res.send({success: false});
    }
    catch(Err) {
        loggerError.info(Err)
        console.log(Err)
        // driver.close()
        res.send({success: false, result : '잠시 후에 다시 시도해주세요'})
    }
});

export default router;