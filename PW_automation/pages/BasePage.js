exports.BasePage = class BasePage {

    constructor(page) {
        this.page = page;
    }

    async gotoPage(url) {
        await this.page.goto(url)
    }

}