const createRoomLocators = require('../common/locators/createRoom_locator.json');
const { HomePage } = require('./HomePage');
 
exports.CreateRoom = class CreateRoom extends HomePage {
    constructor(page) {
        super(page);
    }
 
    async clickButtonCreateRoom() {
        await this.page.click(createRoomLocators.buttonCreateRoom);
    }
   
    // async getMessage(locator) {
    //     // Truy cập thông điệp bằng JS (nếu muốn kiểm tra đúng text):
    //     const msg = await page.locator(locator).evaluate(el => el.validationMessage);
    //     expect(msg).toContain('Please fill out this field');
    // }
 
    async createRoom(roomNumber, floor, capacity, price, building, type) {
            if (roomNumber) {
                await this.page.fill(createRoomLocators.inputRoomNumber, roomNumber);
            }
            if (building) {
                await this.page.click(createRoomLocators.inputRoomBuilding);
                await this.selectValueBuilding(building);
            }
            if (floor) {
                await this.page.fill(createRoomLocators.inputFloor, floor);
            }
            if (capacity) {
                await this.page.fill(createRoomLocators.inputRoomCapacity, capacity);
            }
            if (type) {
                await this.page.click(createRoomLocators.inputRoomType);
                await this.selectValueType(type);
            }
            if (price) {
                await this.page.fill(createRoomLocators.inputRoomPrice, price);
            }
       
            // Bấm nút "Thêm"
            await this.page.click(createRoomLocators.buttonAdd);
       
            // Kiểm tra field nào bị invalid → return validationMessage thực
            const allFields = [
                createRoomLocators.inputRoomNumber,
                createRoomLocators.inputRoomBuilding,
                createRoomLocators.inputFloor,
                createRoomLocators.inputRoomCapacity,
                createRoomLocators.inputRoomType,
                createRoomLocators.inputRoomPrice
            ];
       
            for (const selector of allFields) {
                // kiểm tra xem thẻ nào vi phạm invalid
                const isInvalid = await this.page.locator(selector).evaluate(el => el.matches(':invalid'));
                if (isInvalid) {
                    // get validation message từ trình duyệt vì thẻ input dùng thuốc tính required
                    const msg = await this.page.locator(selector).evaluate(el => el.validationMessage);
                    return msg;
                }
            }
            return null; // Nếu không có lỗi
    };
       
    async selectValueBuilding (value) {
        const locator = createRoomLocators.valueRoomBuilding.replace('${value}', value);
        await this.page.click(locator);
    }
    async selectValueType (value) {
        const locator = createRoomLocators.valueRoomType.replace('${value}', value);
        await this.page.click(locator);
    }
   
 
}