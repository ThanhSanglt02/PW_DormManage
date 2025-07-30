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

    }
}
module.exports = common