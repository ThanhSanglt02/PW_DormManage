const common = {

    async waitForUrl(page, url, seconds) {
        await page.waitForURL(url, {timeout: seconds})
    },

    async waitForSelector(page, locator, seconds) {
        if (locator.startsWith('//') || locator.startsWith('(')) {
            // Wait for an element using XPath
        await page.locator(locator).waitFor();
        }
        else {
            // Wait for an element with the locaotr by css or id appear
           await page.waitForSelector(locator, {timeout: seconds});
        }

    },

    async splitStringDate(value) {
        if (!/[-/]/.test(value)) {
            console.log("Chuỗi không chứa ký tự - hoặc /");
        }
        else {
            const value_arr = value.split(/[-/]/);
            return value_arr
        }
    },

    getTestInfo(testInfo, expect, actual) {
        testInfo.annotations.push({ type: 'actual', description: actual });
        testInfo.annotations.push({ type: 'expected', description: expect });
    }
}
module.exports = common