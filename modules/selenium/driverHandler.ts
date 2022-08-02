import webdriver, { WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

// new driver 반환 함수
export const getDriverHandler = async () : Promise<WebDriver> => {
    const driver =  await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().windowSize({width: 1920, height: 1080}))
        .setChromeService(new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH))
        .build();

    return driver;
}