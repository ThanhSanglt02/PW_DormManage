import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CreateRoom } from '../pages/CreateRoom';
import { ListRoom } from '../pages/ListRoom';


const user_data = require('../common/testData/user_data.json')
const room_data = require('../common/testData/room_data.json');
const common = require('../common/Common');

let loginPage;
let homePage;
let createRoomPage;
let listRoomPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    createRoomPage = new CreateRoom(page);
    listRoomPage = new ListRoom(page);


    // Login
    loginPage.goToLoginPage()
    loginPage.login(user_data.validUser.username, user_data.validUser.password)
    // await page.goto('http://localhost:3000/admin');
});


test('TC_CRTROOM_01 - Kiểm tra điều hướng đến trang tạo phòng', async ({ page }) => {
    await homePage.goToCreateRoomPage();  
    await createRoomPage.clickCardRoomManage();
    await expect(page).toHaveURL('http://localhost:3000/admin/room/add');
}); 


test('TC_CRTROOM_02 - Kiểm tra việc tạo phòng mới thành công với thông tin hợp lệ', async ({ page }) => {
    // Dữ liệu để test
    const roomNumber = room_data.roomNumber;
    const capacity = room_data.capacity;
    const price = room_data.price;
    // Lấy giá trị cụ thể từ mảng options
    const building = room_data.buildingOptions[0].value; // "R1"
    const type = room_data.typeOptions[0].value; // "standard"
    const status = room_data.statusOptions[0].value; // "Còn trống"


    
    await homePage.goToCreateRoomPage();  
    await createRoomPage.clickCardRoomManage();
    await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
    await createRoomPage.clickButtonCreateRoom();
    const result = await createRoomPage.aserrtGetMessage('Đăng ký phòng thành công')
    expect(result).toBe('Đăng ký phòng thành công');
}); 