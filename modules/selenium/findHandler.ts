import { By, until, WebDriver } from "selenium-webdriver";

export const findElementById = async (driver: WebDriver, id: string, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
  
export const findElementByName = async (driver: WebDriver, name: string, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };

export const findElementByCss = async (driver: WebDriver, css: string, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.css(css)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
  
export const findElementByXpath = async (driver: WebDriver, xpath: string, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };

export const findElementByClass = async (driver: WebDriver, classname: string, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.className(classname)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

export const findElementByTagName = async (driver: WebDriver, tag: string, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.tagName(tag)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};