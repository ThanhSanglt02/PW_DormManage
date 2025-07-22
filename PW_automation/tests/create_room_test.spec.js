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

test.only('TC_CRTROOM_01 - Kiểm tra điều hướng đến trang tạo phòng', async ({ page }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(user_data.validUser.username, user_data.validUser.password);
    await homePage.goToCreateRoomPage();  
    await createRoomPage.clickButtonCreateRoom();
    await expect(page).toHaveURL('http://localhost:3000/admin/room/add');
}); 

test('TC_001 - Kiểm tra tạo phòng mới thành công', async ({ page }) => {
    // Dữ liệu để test
    const roomNumber = room_data.roomNumber;
    const floor = room_data.floor;
    const capacity = room_data.capacity;
    const price = room_data.price;
    // Lấy giá trị cụ thể từ mảng options
    const building = room_data.buildingOptions[0].value; // "R1"
    const type = room_data.typeOptions[0].value; // "standard"

    await loginPage.goToLoginPage();
    await loginPage.login(user_data.validUser.username, user_data.validUser.password);
    await homePage.goToCreateRoomPage();
    await createRoomPage.clickButtonCreateRoom();
    await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
}); 