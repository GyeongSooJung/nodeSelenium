import { By, until, WebDriver } from "selenium-webdriver";

export const findElementById = async (driver: WebDriver, id: string, timeout = 2000) => {
    return await driver.wait(until.elementLocated(By.id(id)), timeout);
};
  
export const findElementByName = async (driver: WebDriver, name: string, timeout = 2000) => {
  return await driver.wait(until.elementLocated(By.name(name)), timeout);
};

export const findElementByCss = async (driver: WebDriver, css: string, timeout = 2000) => {
  return await driver.wait(until.elementLocated(By.css(css)), timeout);
};
  
export const findElementByXpath = async (driver: WebDriver, xpath: string, timeout = 2000) => {
  return await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
};

export const findElementByClass = async (driver: WebDriver, classname: string, timeout = 2000) => {
  return await driver.wait(until.elementLocated(By.className(classname)), timeout);
};

export const findElementByTagName = async (driver: WebDriver, tag: string, timeout = 2000) => {
  return await driver.wait(until.elementLocated(By.tagName(tag)), timeout);
};

export const findElementsById = async (driver: WebDriver, id: string) => {
  return  await driver.findElements(By.id(id));
};

export const findElementsByName = async (driver: WebDriver, name: string) => {
  return  await driver.findElements(By.name(name));
};

export const findElementsByCss = async (driver: WebDriver, css: string) => {
  return  await driver.findElements(By.css(css));
};

export const findElementsByXpath = async (driver: WebDriver, xpath: string) => {
  return  await driver.findElements(By.xpath(xpath));
};

export const findElementsByClass= async (driver: WebDriver, classname: string) => {
  return  await driver.findElements(By.className(classname));
};

export const findElementsByTagName= async (driver: WebDriver, tagName: string) => {
  return  await driver.findElements(By.tagName(tagName));
};

