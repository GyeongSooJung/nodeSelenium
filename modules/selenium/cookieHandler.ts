import {  IWebDriverCookie, WebDriver } from "selenium-webdriver";

// 쿠키 추가하기
export const addCookie = async (driver : WebDriver, cookie : any ) => {
    await driver.manage().addCookie(cookie)
}

// 쿠키 하나 가져오기
export const getOneCookie = async (driver : WebDriver, key : string) : Promise<IWebDriverCookie> => {
    return await driver.manage().getCookie(key);
}

// 쿠키 전부 가져오기 
export const getAllCookie = async (driver : WebDriver) : Promise<IWebDriverCookie[]> => {
    return await driver.manage().getCookies();
}

// 쿠키 하나 지우기
export const deleteOneCookie = async (driver : WebDriver,  key : string) => {
    return await driver.manage().deleteCookie(key);
}

// 쿠키 전부 지우기
export const deleteAllCookie = async (driver : WebDriver) => {
    return await driver.manage().deleteAllCookies();
}