import { WebDriver } from "selenium-webdriver";

// 경로에 맞는 파일 등록 ( 인증서 등 )
export const fileRegister = async (driver : WebDriver, by: any, key : string, path: string[] ) => { 
    let pathString : string = "";

    // 받은 배열을 줄바꿈을 포함한 문자열로 바꿔준다.
    path.map((item : string, index: number) => {
        if(index < pathString.length) {
            pathString = item + " \n "
        }
    })

    driver.findElement(by(key)).sendKeys(pathString);
}
