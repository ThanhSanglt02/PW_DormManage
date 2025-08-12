import {test} from '../tests/base_test.spec';
import { expect } from '@playwright/test';
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
    loginPage.login(user_data.validUser.username, user_data.validUser.password)
    // await page.goto('http://localhost:3000/admin');
});


test('TC_CRTROOM_01 - Kiểm tra điều hướng đến trang tạo phòng', async ({ page }) => {
    await homePage.goToCreateRoomPage();  
    await createRoomPage.clickCardRoomManage();
    await expect(page).toHaveURL('http://localhost:3000/admin/room-registration');
}); 


test('TC_CRTROOM_02 - Kiểm tra việc tạo phòng mới thành công với thông tin hợp lệ', async ({ page }, testInfo) => {
  // Dữ liệu để test
  const roomNumber = room_data.roomNumber;
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  // message expected
  const expectResult = room_data.messageCreateRoomSuccess // Đăng ký phòng thành công

  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();

  const result = await createRoomPage.aserrtGetMessage(expectResult)
  // Gán actual/expected vào testInfo
  common.getTestInfo(testInfo, expectResult, result)

  expect(result).toBe(expectResult);
}); 

// test.describe.serial() + chia nhỏ bước thành test: Khi dùng serial, tất cả test sẽ dùng chung 1 page trong cùng browser context, và không reset lại giữa các test.

test('TC_CRTROOM_03 - Kiểm tra hệ thống chặn ký tự chữ khi nhập liệu cho trường số phòng', async ({ page }, testInfo) => {
  // Dữ liệu để test
  const roomNumberText = 'P101';
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  // message expected
  const expectResult = '101'

  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumberText, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();

  console.log("[Test case 3] Gia tri input truyen vao: " + roomNumberText)
  const result = await createRoomPage.getInputValue('roomNumber')
  console.log("[Test case 3] Gia tri thuc te hien thi: " + result)
  // Gán actual/expected vào testInfo
  common.getTestInfo(testInfo, expectResult, result)

  expect(result).toBe(expectResult);
}); 

test('TC_CRTROOM_04 - Kiểm tra việc tạo phòng với số phòng đã tồn tại', async({page}, testInfo) => {
  // Dữ liệu để test
  const roomNumber = room_data.roomNumber;  // số phòng đã tồn tại
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  // message expected
  const expectResult = room_data.messageIdDuplicate // Số phòng đã tồn tại
  
  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();
  // Rule: Số phòng chỉ chứa số và tối đa 3 ký tự
  const result = await createRoomPage.aserrtGetMessage(expectResult)
  // Gán actual/expected vào testInfo
  common.getTestInfo(testInfo, expectResult, result)

  expect(result).toBe(expectResult);
});

test('TC_CRTROOM_05 - Kiểm tra hệ thống chặn ký tự đặc biệt khi nhập liệu cho trường số phòng', async ({ page }, testInfo) => {
  // Dữ liệu để test
  const roomNumberText = '@@@@';
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  // message expected
  const expectResult = ''

  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumberText, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();

  console.log("[Test case 5] Gia tri input truyen vao: " + roomNumberText)
  const result = await createRoomPage.getInputValue('roomNumber')
  console.log("[Test case 5] Gia tri thuc te hien thi: " + result)
  // Gán actual/expected vào testInfo
  common.getTestInfo(testInfo, expectResult, result)

  expect(result).toBe(expectResult);
}); 


test('TC_CRTROOM_06 - Kiểm tra giới hạn ô nhập dữ liệu cho trường số phòng', async({page}, testInfo) => {
  // Dữ liệu để test
  const roomNumberValue = room_data.roomNumberLimit; 
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumberValue, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();
  const actualLenght = await createRoomPage.getLimitCharacter('roomNumber');
  console.log(`[Test case 6] Độ dài ký tự thực tế của input là: ${actualLenght}`)
  
  common.getTestInfo(testInfo, 3, actualLenght)
  // Rule: Số phòng chỉ chứa số và tối đa 3 ký tự
  await expect(actualLenght).toBeLessThanOrEqual(3); // đảm bảo chỉ còn lại 3 ký tự

})

test('TC_CRTROOM_07 - Kiểm tra việc giá trị âm cho trường Sức chứa', async({page}, testInfo) => {
  // Dữ liệu để test
  const roomNumber = '199'; 
  const capacity = "-8";
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  // message expected
  const expectResult = room_data.messageCapacityInvalid // Sức chứa không hợp lệ
  
  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();
  // Rule: Số phòng chỉ chứa số và tối đa 3 ký tự
  const result = await createRoomPage.aserrtGetMessage(expectResult)
  // Gán actual/expected vào testInfo
  common.getTestInfo(testInfo, expectResult, result)

  expect(result).toBe(expectResult);
})

test('TC_CRTROOM_08 - Kiểm tra việc nhập giá trị vượt ngưỡng tối đa là 10 cho trường Sức chứa', async({page}, testInfo) => {
  // Dữ liệu để test
  const roomNumber = '449'; 
  const capacity = "12";
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[1].value; // "R2"
  const type = room_data.typeOptions[1].value; 
  const status = room_data.statusOptions[0].value; // "Còn trống"

  // message expected
  const expectResult = room_data.messageCapacityInvalid // Sức chứa không hợp lệ
  
  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();
  // Rule: Số phòng chỉ chứa số và tối đa 3 ký tự
  const result = await createRoomPage.aserrtGetMessage(expectResult)
  // Gán actual/expected vào testInfo
  common.getTestInfo(testInfo, expectResult, result)

  expect(result).toBe(expectResult);
})

test('TC_CRTROOM_09 - Kiểm tra việc nhập giá trị âm cho trường Giá phòng', async({page}, testInfo) => {
  // Dữ liệu để test
  const roomNumber = '227'; 
  const capacity = room_data.capacity;
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  // message expected
  const expectResult = room_data.messagePriceInvalid // Giá phòng không hợp lệ
  
  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();
  // Rule: Số phòng chỉ chứa số và tối đa 3 ký tự
  const result = await createRoomPage.aserrtGetMessage(expectResult)
  // Gán actual/expected vào testInfo
  common.getTestInfo(testInfo, expectResult, result)

  expect(result).toBe(expectResult);
});

test('TC_CRTROOM_10 - Kiểm tra khi click liên tục button Đăng ký', async({page}) => { 
  // Dữ liệu để test
  const roomNumber = '440'; 
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
  for (let i = 0; i <= 1; i++) {
    await createRoomPage.clickButtonCreateRoom();
  }
  await homePage.goToListRoomPage()
  await listRoomPage.searchRoom(440)
  // kiểm tra chỉ có 1 phòng được tạo ra cho dù click btn nhiều lần
  await listRoomPage.checkNumberofRoomExist(1)    
});


