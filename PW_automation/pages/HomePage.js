const homeLocators = require('../common/locators/home_locator.json');
const { LoginPage } = require('./LoginPage');

exports.HomePage = class HomePage extends LoginPage {
    constructor(page) {
        super(page);
    }

    async goToCreateRoomPage() {
        await this.page.click(homeLocators.cardRoomList);
    }
}