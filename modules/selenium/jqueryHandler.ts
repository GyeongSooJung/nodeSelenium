import { By, WebDriver } from "selenium-webdriver";

// 해당 document의 value값을 바꿔준다.
export const JqChangeValueByID = async (driver : WebDriver, id : string, value: string ) => {
    await driver.executeScript(`document.getElementById('${id}').value='${value}';`)
}

export const JqSetAttribute = async (driver : WebDriver, id : string, attribute: string[] ) => {
    await driver.executeScript(`document.getElementById('${id}').setAttribute('${attribute[0]}','${attribute[1]}')`)
}

export const JqRemoveAttribute = async (driver : WebDriver, id : string, attribute: string ) => {
    await driver.executeScript(`document.getElementById('${id}').removeAttribute("${attribute}")`)
}