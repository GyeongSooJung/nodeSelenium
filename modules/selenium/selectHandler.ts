import { WebDriver, WebElement } from "selenium-webdriver";

// Select 클래스
export class Select {
    element : WebElement;

    // 생성자 - driver element 생성해줌
    constructor (element : WebElement) {
        this.element = element;
    }

    selectByVisibleText(str : string){
    }


}

export const selectOption = async (driver : WebDriver, key : string) => {
    
}