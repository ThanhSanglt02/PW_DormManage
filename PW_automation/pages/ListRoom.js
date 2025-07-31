import {expect} from '@playwright/test'
import { HomePage } from './HomePage';

const listRoomLocator = require('../common/locators/listRoom_locator.json'); // .. quay ve root cua du an la PW_autotmation 


exports.ListRoom = class ListRoom extends HomePage { 

    constructor(page) {
        super(page);
    }

    async searchRoom(value) {
        const valueText = value.toString();
        await this.page.fill(listRoomLocator.inputSearchRoom, valueText)
    }

    async checkNumberofRoomExist(number) {
        const el = this.page.locator(listRoomLocator.numberOfRoom)
        const actual = await el.innerText()

        // Chuyển number thành chuỗi
        const numberText = number.toString();

        console.log(`Expected number of rooms: ${numberText}`);
        console.log(`Actual number of rooms: ${actual}`);

        await expect(actual).toContain(numberText)
    }
}
