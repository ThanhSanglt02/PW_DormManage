import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CreateRoom } from '../pages/CreateRoom';

const user_data = require('../common/testData/user_data.json')
const room_data = require('../common/testData/room_data.json');

let loginPage;
let homePage;
let createRoomPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    createRoomPage = new CreateRoom(page);
    // await page.goto('http://localhost:3000/admin');
  });

test('TC_CRTROOM_01 - Kiểm tra điều hướng đến trang tạo phòng', async ({ page }) => {
    loginPage.goToLoginPage()
    loginPage.login(user_data.validUser.username, user_data.validUser.password)
    await homePage.goToCreateRoomPage();  
    await createRoomPage.clickButtonCreateRoom();
    await expect(page).toHaveURL('http://localhost:3000/admin/room/add');
}); 


test('TC_CRTROOM_02 - Kiểm tra việc tạo phòng mới thành công với thông tin hợp lệ', async ({ page }) => {
    loginPage.goToLoginPage()
    loginPage.login(user_data.validUser.username, user_data.validUser.password)
    // Dữ liệu để test
    const roomNumber = room_data.roomNumber;
    const floor = room_data.floor;
    const capacity = room_data.capacity;
    const price = room_data.price;
    // Lấy giá trị cụ thể từ mảng options
    const building = room_data.buildingOptions[0].value; // "R1"
    const type = room_data.typeOptions[0].value; // "standard"

    // await loginPage.goToLoginPage();
    // await loginPage.login(user_data.validUser.username, user_data.validUser.password);
    await homePage.goToCreateRoomPage();
    await createRoomPage.clickButtonCreateRoom();
    await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
}); 

// test.describe.serial() + chia nhỏ bước thành test: Khi dùng serial, tất cả test sẽ dùng chung 1 page trong cùng browser context, và không reset lại giữa các test.
   
test.describe.only('Kiểm thử các trường hợp bỏ trống trường', () => {

  // set up before
  test.beforeEach(async({page}) => {
    loginPage.goToLoginPage()   
    loginPage.login(user_data.validUser.username, user_data.validUser.password)
  })

  // TC_03
  test('TC_CRTROOM_03 - Kiểm tra hiển thị thông báo lỗi khi người dùng bỏ trống trường Số phòng', async ({ page }) => {
    // Dữ liệu để test
    const roomNumber = "";
    const floor = room_data.floor;
    const capacity = room_data.capacity;
    const price = room_data.price;
    // Lấy giá trị cụ thể từ mảng options
    const building = room_data.buildingOptions[0].value; // "R1"
    const type = room_data.typeOptions[0].value; // "standard"

    // await loginPage.goToLoginPage();
    // await loginPage.login(user_data.validUser.username, user_data.validUser.password);
    await homePage.goToCreateRoomPage();
    await createRoomPage.clickButtonCreateRoom();
    const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
    await expect(msg).toBe("Please fill out this field.")
  }); 


  test('TC_CRTROOM_05 - Kiểm tra việc hiển thị thông báo lỗi khi người dùng bỏ trống trường Tòa nhà', async ({ page }) => {
    // Dữ liệu để test
    const roomNumber = "3213";
    const floor = room_data.floor;
    const capacity = room_data.capacity;
    const price = room_data.price;  
    // Lấy giá trị cụ thể từ mảng options
    const building = ""; // "R1"
    const type = room_data.typeOptions[0].value; // "standard"

    // await loginPage.goToLoginPage();
    // await loginPage.login(user_data.validUser.username, user_data.validUser.password);
    await homePage.goToCreateRoomPage();
    await createRoomPage.clickButtonCreateRoom();
    const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
    await expect(msg).toBe("Please fill out this field.")
  }); 

  test('TC_CRTROOM_06 - Kiểm tra việc hiển thị thông báo lỗi khi người dùng bỏ trống trường Tầng', async ({ page }) => {
    // Dữ liệu để test
    const roomNumber = "53543";
    const floor = "";
    const capacity = room_data.capacity;
    const price = room_data.price;
    // Lấy giá trị cụ thể từ mảng options
    const building = room_data.buildingOptions[0].value; // "R1"
    const type = room_data.typeOptions[0].value; // "standard"

    // await loginPage.goToLoginPage();
    // await loginPage.login(user_data.validUser.username, user_data.validUser.password);
    await homePage.goToCreateRoomPage();
    await createRoomPage.clickButtonCreateRoom();
    const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
    await expect(msg).toBe("Please fill out this field.")
  }); 

  test('TC_CRTROOM_07 - Kiểm tra việc hiển thị thông báo lỗi khi người dùng bỏ trống trường Sức chứa', async ({ page }) => {
    // Dữ liệu để test
    const roomNumber = "43543";
    const floor = room_data.floor;
    const capacity = "";
    const price = room_data.price;
    // Lấy giá trị cụ thể từ mảng options
    const building = room_data.buildingOptions[0].value; // "R1"
    const type = room_data.typeOptions[0].value; // "standard"

    // await loginPage.goToLoginPage();
    // await loginPage.login(user_data.validUser.username, user_data.validUser.password);
    await homePage.goToCreateRoomPage();
    await createRoomPage.clickButtonCreateRoom();
    const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
    await expect(msg).toBe("Please fill out this field.")
  }); 

  test('TC_CRTROOM_08 - Kiểm tra việc hiển thị thông báo lỗi khi người dùng bỏ trống trường Giá phòng', async ({ page }) => {
    // Dữ liệu để test
    const roomNumber = "54534";
    const floor = room_data.floor;
    const capacity = room_data.capacity;
    const price ="";
    // Lấy giá trị cụ thể từ mảng options
    const building = room_data.buildingOptions[0].value; // "R1"
    const type = room_data.typeOptions[0].value; // "standard"

    // await loginPage.goToLoginPage();
    // await loginPage.login(user_data.validUser.username, user_data.validUser.password);
    await homePage.goToCreateRoomPage();
    await createRoomPage.clickButtonCreateRoom();
    const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
    await expect(msg).toBe("Please fill out this field.")
  }); 

})


// TC_04
test('TC_CRTROOM_04 - Kiểm tra việc nhập ký tự bắt đầu cho trường Số phòng là chữ', async ({ page }) => {
  // Dữ liệu để test
  const roomNumber = "P101";
  const floor = room_data.floor;
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  // await loginPage.goToLoginPage();
  // await loginPage.login(user_data.validUser.username, user_data.validUser.password);
  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  await expect(msg).toBe("Please fill out this field.")
}); 


// test('TC_CRTROOM_04 - Kiểm tra việc nhập ký tự bắt đầu cho trường Số phòng là chữ', async({page}) => {
  
// })