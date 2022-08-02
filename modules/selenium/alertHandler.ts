import { until, WebDriver } from "selenium-webdriver";

// alert 확인 누르기
export const alertCloseAccept = async (driver : WebDriver ) => {

    // alert 창 뜰 때까지 기다림
    await driver.wait(until.alertIsPresent());

    // alert 로 드라이버 이동
    let alert = await driver.switchTo().alert();

    // alert text 사용하는 곳
    let alertText = await alert.getText();

    // 확인버튼 클릭
    await alert.accept();

    // 다시 원래 컨텐츠로 드라이버 이동
    await driver.switchTo().defaultContent();
}

// alert 닫기 누르기
export const alertCloseDismiss = async (driver : WebDriver ) => {

    // alert 창 뜰 때까지 기다림
    await driver.wait(until.alertIsPresent());

    // alert 로 드라이버 이동
    let alert = await driver.switchTo().alert();

    // alert text 사용하는 곳
    let alertText = await alert.getText();

    // 확인버튼 클릭
    await alert.dismiss();

    // 다시 원래 컨텐츠로 드라이버 이동
    await driver.switchTo().defaultContent();
}

// prompt 핸들러
export const promptCloseHandler = async (driver : WebDriver, text : string) => {

    // alert 창 뜰 때까지 기다림
    await driver.wait(until.alertIsPresent());

    // alert 로 드라이버 이동
    let alert = await driver.switchTo().alert();
    
    // prompt text 전송
    await alert.sendKeys(text)
    
    // 확인버튼 클릭
    await alert.accept();
    
    // 다시 원래 컨텐츠로 드라이버 이동
    await driver.switchTo().defaultContent(); 
}