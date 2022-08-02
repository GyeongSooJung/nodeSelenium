import { By, WebDriver } from "selenium-webdriver";

// 해당 document의 value값을 바꿔준다.
export const JqueryChangeValueByID = async (driver : WebDriver, id : string, value: string ) => {
    driver.executeScript(`document.getElementById('${id}').value='${value}';`)
}
