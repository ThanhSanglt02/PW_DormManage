import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CreateRoom } from '../pages/CreateRoom';
import { ListRoom } from '../pages/ListRoom';


const user_data = require('../common/testData/user_data.json')
const room_data = require('../common/testData/room_data.json');

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

// test.describe.serial() + chia nhỏ bước thành test: Khi dùng serial, tất cả test sẽ dùng chung 1 page trong cùng browser context, và không reset lại giữa các test.


// TC_0
test('TC_CRTROOM_03 - Kiểm tra việc nhập ký tự bắt đầu cho trường Số phòng là chữ', async ({ page }) => {
  // Dữ liệu để test
  const roomNumber = "P312";
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
  // Rule: Số phòng chỉ chứa số và tối đa 3 ký tự
  const result = await createRoomPage.aserrtGetMessage('Số phòng không hợp lệ')
  expect(result).toBe('Số phòng không hợp lệ');
}); 


test('TC_CRTROOM_04 - Kiểm tra việc tạo phòng với số phòng đã tồn tại', async({page}) => {
  // Dữ liệu để test
  const roomNumber = room_data.roomNumber;  // số phòng đã tồn tại
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
  const result = await createRoomPage.aserrtGetMessage('Số phòng đã tồn tại')
  expect(result).toBe('Số phòng đã tồn tại');
})

test('TC_CRTROOM_05 - Kiểm tra chức năng tạo phòng khi nhập ký tự đặc biệt cho trường số phòng', async({page}) => {
  // Dữ liệu để test
  const roomNumber = '@1234@';  
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
  const result = await createRoomPage.aserrtGetMessage('Số phòng không hợp lệ')
  expect(result).toBe('Số phòng không hợp lệ');
})

test('TC_CRTROOM_06 - Kiểm tra giới hạn ô nhập dữ liệu cho trường số phòng', async() => {
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
  console.log(`Độ dài ký tự thực tế của input là: ${actualLenght}`)
  await expect(actualLenght).toBeLessThanOrEqual(3); // đảm bảo chỉ còn lại 3 ký tự

})

test('TC_CRTROOM_07 - KKiểm tra việc giá trị âm cho trường Sức chứa', async() => {
  // Dữ liệu để test
  const roomNumber = '199'; 
  const capacity = "-8";
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();
  const result = await createRoomPage.aserrtGetMessage('Sức chứa không hợp lệ')
  expect(result).toBe('Sức chứa không hợp lệ');
})

test('TC_CRTROOM_08 - Kiểm tra việc nhập giá trị vượt ngưỡng tối đa là 10 cho trường Sức chứa', async() => {
  // Dữ liệu để test
  const roomNumber = '449'; 
  const capacity = "12";
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[1].value; // "R2"
  const type = room_data.typeOptions[1].value; 
  const status = room_data.statusOptions[0].value; // "Còn trống"

  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();
  const result = await createRoomPage.aserrtGetMessage('Sức chứa không hợp lệ')
  expect(result).toBe('Sức chứa không hợp lệ');
})

test('TC_CRTROOM_09 - Kiểm tra việc nhập giá trị âm cho trường Giá phòng', async() => {
  // Dữ liệu để test
  const roomNumber = '227'; 
  const capacity = room_data.capacity;
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"
  const status = room_data.statusOptions[0].value; // "Còn trống"

  await homePage.goToCreateRoomPage();  
  await createRoomPage.clickCardRoomManage();
  await createRoomPage.fillToCreateRoom(roomNumber, capacity, price, building, type, status);
  await createRoomPage.clickButtonCreateRoom();
  const result = await createRoomPage.aserrtGetMessage('Giá phòng không hợp lệ')
  expect(result).toBe('Giá phòng không hợp lệ');
});

test('TC_CRTROOM_10 - Kiểm tra khi click liên tục button Đăng ký', async({page}) => {  // note làm sau
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
  await listRoomPage.searchRoom(338)
  // kiểm tra chỉ có 1 phòng được tạo ra cho dù click btn nhiều lần
  await listRoomPage.checkNumberofRoomExist(1)    
});


