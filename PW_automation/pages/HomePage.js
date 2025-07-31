const homeLocators = require('../common/locators/home_locator.json');
const common = require('../common/Common')
const { LoginPage } = require('./LoginPage');

exports.HomePage = class HomePage extends LoginPage {
    constructor(page) {
        super(page);
    }

    async goToCreateRoomPage() {
        await this.page.click(homeLocators.cardRoomManage);
    };

    async goToListRoomPage() {
        common.waitForSelector(this.page, homeLocators.cardRoomList, 10000)
        await this.page.click(homeLocators.cardRoomList)
    }

    async goToRegisterStudentPage() {
        common.waitForSelector(this.page, homeLocators.cardRegisterStudent, 10000)
        await this.page.click(homeLocators.cardRegisterStudent)
    }
}