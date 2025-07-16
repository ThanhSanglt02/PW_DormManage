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

        await this.page.selectOption(createRoomLocators.inputRoomBuilding, building);   

        await this.page.fill(createRoomLocators.inputFloor, floor);
        await this.page.fill(createRoomLocators.inputRoomCapacity, capacity);
        await this.page.selectOption(createRoomLocators.inputRoomType, type);
        await this.page.fill(createRoomLocators.inputRoomPrice, price);
        await this.page.click(createRoomLocators.buttonAdd);
    }

    
}
