const loginLocators = require('../common/locators/login_locator.json');


exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
    }
    // async goToLoginPage() {
    //     const urlLoginPage = "http://localhost:3000/login"
    //     await this.page.goto(urlLoginPage);
    // }
    async login(username, password) {
        await this.page.fill(loginLocators.usernameInput, username);
        await this.page.fill(loginLocators.passwordInput, password);
        await this.page.click(loginLocators.loginButton);

    }
    

}