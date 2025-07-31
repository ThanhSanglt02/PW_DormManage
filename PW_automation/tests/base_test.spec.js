// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { HomePage } from '../pages/HomePage';
// import { CreateRoom } from '../pages/CreateRoom';
// import { ListRoom } from '../pages/ListRoom';


// const user_data = require('../common/testData/user_data.json')
// const room_data = require('../common/testData/room_data.json');
// const common = require('../common/Common');

// let loginPage;
// let homePage;
// let createRoomPage;
// let listRoomPage;

// test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     homePage = new HomePage(page);
//     createRoomPage = new CreateRoom(page);
//     listRoomPage = new ListRoom(page);


//     // Login
//     loginPage.goToLoginPage()
//     loginPage.login(user_data.validUser.username, user_data.validUser.password)
//     // await page.goto('http://localhost:3000/admin');
// });