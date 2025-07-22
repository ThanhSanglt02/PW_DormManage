const createRoomLocators = require('../common/locators/createRoom_locator.json');
const { HomePage } = require('./HomePage');

exports.CreateRoom = class CreateRoom extends HomePage {
    constructor(page) {
        super(page);
    }

    async clickButtonCreateRoom() {
        await this.page.click(createRoomLocators.buttonCreateRoom);
    }

    async createRoom(roomNumber, floor, capacity, price, building, type) {
        await this.page.fill(createRoomLocators.inputRoomNumber, roomNumber);
        await this.page.click(createRoomLocators.inputRoomBuilding);
        await this.selectValueBuilding(building);
        await this.page.fill(createRoomLocators.inputFloor, floor);
        await this.page.fill(createRoomLocators.inputRoomCapacity, capacity);
        await this.page.click(createRoomLocators.inputRoomType);
        await this.selectValueType(type);
        await this.page.fill(createRoomLocators.inputRoomPrice, price);
        await this.page.click(createRoomLocators.buttonAdd);
    }
    async selectValueBuilding (value) {
        const locator = createRoomLocators.valueRoomBuilding.replace('${value}', value);
        await this.page.click(locator);
    }
    async selectValueType (value) {
        const locator = createRoomLocators.valueRoomType.replace('${value}', value);
        await this.page.click(locator);
    }
}
