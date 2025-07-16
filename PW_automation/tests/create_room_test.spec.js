import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CreateRoom } from '../pages/CreateRoom';

const user_data = require('../common/testData/user_data.json');
const room_data = require('../common/testData/room_data.json');

let loginPage;
let homePage;
let createRoomPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    createRoomPage = new CreateRoom(page);
  });

test('TC_001 - Kiểm tra tạo phòng mới thành công', async ({ page }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(user_data.validUser.username, user_data.validUser.password);
    await homePage.goToCreateRoomPage();
    await createRoomPage.clickButtonCreateRoom();
    await createRoomPage.createRoom(room_data.roomNumber, room_data.floor, room_data.capacity, room_data.price, room_data.building, room_data.type);
}); 