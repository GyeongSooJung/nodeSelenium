import { Locator, until, WebDriver } from "selenium-webdriver";

// 경로에 맞는 파일 등록 ( 인증서 등 )
export const fileRegister = async (driver : WebDriver, func : Locator, path: string[] ) => { 
    let pathString : string = "";
    
    // 받은 배열을 줄바꿈을 포함한 문자열로 바꿔준다.
    path.map((item : string, index: number) => {
        if(index < path.length - 1) {
            pathString = pathString + item + " \n "
        }
        else {
            pathString = pathString + item
        }
    })
    
    const el = await driver.wait(until.elementLocated(func), 2000);
    return await driver.wait(until.elementIsVisible(el), 2000).sendKeys(pathString);
}
