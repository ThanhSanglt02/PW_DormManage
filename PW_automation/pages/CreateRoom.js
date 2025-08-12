const createRoomLocators = require('../common/locators/createRoom_locator.json'); // .. quay ve root cua du an la PW_autotmation
const { HomePage } = require('./HomePage');
import { expect } from '@playwright/test';
 
exports.CreateRoom = class CreateRoom extends HomePage {
    constructor(page) {
        super(page);
    }
 
    async clickCardRoomManage() {
        await this.page.click(createRoomLocators.buttonCreateRoom);
    };
   
    async aserrtGetMessage(expected) {
        try {
            const locator = this.page.locator(createRoomLocators.message);
            await locator.waitFor({ timeout: 5000 }); // chờ xuất hiện
    
            const actual = await locator.textContent();
            const actualTrimmed = actual?.trim();
            const expectedTrimmed = expected.trim();

            if (actualTrimmed === expectedTrimmed) {
                return actualTrimmed
            }
            return actualTrimmed

        } catch(e) {
            console.log(e.message) //"Không lấy được message | Hết session timeout"
            return 'failed'
        }
    };
   

    async getLimitCharacter(input) {
        // slice(1): cắt chuỗi từ vị trí thứ 1 đến hết (bỏ ký tự đầu)
        const locatorKey = `input${input.charAt(0).toUpperCase()}${input.slice(1)}`; // nối chuỗi input${...}${...} 
        // console.log(locatorKey)
        const locator = createRoomLocators[locatorKey];

        if (!locator) {
            throw new Error(`Không tìm thấy locator với key "${locatorKey}"`);
        }

        const element = this.page.locator(locator);
        const actualValue = await element.inputValue();
        return actualValue.length
        
    };

    async getInputValue(input) {
        const locatorKey = `input${input.charAt(0).toUpperCase()}${input.slice(1)}`;
        const locator = createRoomLocators[locatorKey];
        const element = this.page.locator(locator);
        const actualValue = await element.inputValue();
        return actualValue;
    }
    // async getMsgRequired() {
    //     // // Kiểm tra field nào bị invalid → return validationMessage thực
    //     // const allFields = [
    //     //     createRoomLocators.inputRoomNumber,
    //     //     createRoomLocators.inputRoomBuilding,
    //     //     createRoomLocators.inputFloor,
    //     //     createRoomLocators.inputRoomCapacity,
    //     //     createRoomLocators.inputRoomType,
    //     //     createRoomLocators.inputRoomPrice
    //     // ];
    
    //     // if (building === "") {
    //     //     return "Please fill out this field."
    //     // }
    //     // for (const selector of allFields) {
    //     //     // kiểm tra xem thẻ nào vi phạm invalid
    //     //     // .evaluate() để chạy trên chính phần tử HTML (DOM) thực tế trong trình duyệt --> return true/false
    //     //     const isInvalid = await this.page.locator(selector).evaluate(el => el.matches(':invalid')); 
    //     //     if (isInvalid) {
    //     //         // get validation message từ trình duyệt vì thẻ input dùng thuốc tính required
    //     //         const msg = await this.page.locator(selector).evaluate(el => el.validationMessage);
    //     //         return msg;
    //     //     }
    //     // }
    //     // return null; // Nếu không có lỗi
    // }

 
    async fillToCreateRoom(roomNumber, capacity, price, building, type, status) {
        
        if (roomNumber) {
            await this.page.type(createRoomLocators.inputRoomNumber, roomNumber);
        }
        if (building) {
            await this.page.click(createRoomLocators.inputRoomBuilding);
            await this.selectValueBuilding(building);
        }
        if (capacity) {
            await this.page.type(createRoomLocators.inputRoomCapacity, capacity);
        }
        if (type) {
            await this.page.click(createRoomLocators.inputRoomType);    
            await this.selectValueType(type);
        }
        if (price) {
            await this.page.fill(createRoomLocators.inputRoomPrice, price);
        }
        if (status) {
            await this.page.click(createRoomLocators.inputStatus);
            await this.selectValueStatus(status);
        }
    };

    async clickButtonCreateRoom() {
        // click "Thêm"
        await this.page.click(createRoomLocators.buttonAdd);
    };
       
    async selectValueBuilding (value) {
        const locator = createRoomLocators.valueRoomBuilding.replace('${value}', value);
        await this.page.waitForSelector(locator, { timeout: 5000 });  // Đợi element load xong
        
        await this.page.click(locator);
    }
    async selectValueType (value) {
        const locator = createRoomLocators.valueRoomType.replace('${value}', value);
        await this.page.waitForSelector(locator, { timeout: 5000 });  // Đợi element load xong
        await this.page.click(locator);
    }
    async selectValueStatus (value) {
        const locator = createRoomLocators.valueStatus.replace('${value}', value);
        await this.page.waitForSelector(locator, { timeout: 5000 });  // Đợi element load xong
        await this.page.click(locator);
    }
    
   
}