// setupLogin.js --> file này dùng để không cần chạy Login từ đầu cho mỗi test
const { chromium } = require('@playwright/test');
const user_data = require('../common/testData/user_data.json');
const loginLocators = require('../common/locators/login_locator.json');

module.exports = async ({}) => {

  const browser = await chromium.launch(); // tạo trình duyệt
  const context = await browser.newContext(); // tạo context mới
  const page = await context.newPage(); // tạo page mới

  await page.goto('http://localhost:3000/login');
  await page.fill(loginLocators.usernameInput, user_data.validUser.username);
  await page.fill(loginLocators.passwordInput, user_data.validUser.password);
  await page.click(loginLocators.loginButton);

  // Đợi trang chuyển đến admin sau khi đăng nhập thành công
  await page.waitForURL(/\/admin$/, { timeout: 10000, waitUntil: 'commit' });

  
  // await page.waitForURL('**/dashboard'); // hoặc URL sau login

  // Lưu session vào file
  await context.storageState({ path: './common/auth.json' });
  await browser.close(); // đóng trình duyệt
  
};