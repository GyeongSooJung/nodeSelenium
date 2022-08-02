import { WebDriver } from "selenium-webdriver";

export const naviGet = async ( driver : WebDriver, url : string) => {
    await driver.get(url);
}

export const naviBack = async (driver : WebDriver) => {
    await driver.navigate().back();
}

export const naviForward = async (driver : WebDriver) => {
    await driver.navigate().forward();
}

export const naviRefresh = async (driver : WebDriver) => {
    await driver.navigate().refresh();
}