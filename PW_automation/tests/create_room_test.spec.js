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

    // Login
    loginPage.goToLoginPage()
    loginPage.login(user_data.validUser.username, user_data.validUser.password)
    // await page.goto('http://localhost:3000/admin');
  });

test('TC_CRTROOM_01 - Kiểm tra điều hướng đến trang tạo phòng', async ({ page }) => {
    await homePage.goToCreateRoomPage();  
    await createRoomPage.clickButtonCreateRoom();
    await expect(page).toHaveURL('http://localhost:3000/admin/room/add');
}); 


test('TC_CRTROOM_02 - Kiểm tra việc tạo phòng mới thành công với thông tin hợp lệ', async ({ page }) => {
    // Dữ liệu để test
    const roomNumber = '553';
    const floor = room_data.floor;
    const capacity = room_data.capacity;
    const price = room_data.price;
    // Lấy giá trị cụ thể từ mảng options
    const building = room_data.buildingOptions[0].value; // "R1"
    const type = room_data.typeOptions[0].value; // "standard"

    
    await homePage.goToCreateRoomPage();
    await createRoomPage.clickButtonCreateRoom();
    await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
    const result = await createRoomPage.aserrtGetMessage('Thêm phòng mới thành công')
    expect(result).toBe('Thêm phòng mới thành công');
}); 

// test.describe.serial() + chia nhỏ bước thành test: Khi dùng serial, tất cả test sẽ dùng chung 1 page trong cùng browser context, và không reset lại giữa các test.
   

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

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  await expect(msg).toBe("Please fill out this field.")
}); 


test('TC_CRTROOM_05 - Kiểm tra việc hiển thị thông báo lỗi khi người dùng bỏ trống trường Tòa nhà', async ({ page }) => {
  // Dữ liệu để test
  const roomNumber = "412";
  const floor = room_data.floor;
  const capacity = room_data.capacity;
  const price = room_data.price;  
  // Lấy giá trị cụ thể từ mảng options
  const building = ""; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  await expect(msg).toBe("Please fill out this field.")
}); 

test('TC_CRTROOM_06 - Kiểm tra việc hiển thị thông báo lỗi khi người dùng bỏ trống trường Tầng', async ({ page }) => {
  // Dữ liệu để test
  const roomNumber = "444";
  const floor = "";
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  await expect(msg).toBe("Please fill out this field.")
}); 

test('TC_CRTROOM_07 - Kiểm tra việc hiển thị thông báo lỗi khi người dùng bỏ trống trường Sức chứa', async ({ page }) => {
  // Dữ liệu để test
  const roomNumber = "223";
  const floor = room_data.floor;
  const capacity = "";
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  await expect(msg).toBe("Please fill out this field.")
}); 

test('TC_CRTROOM_08 - Kiểm tra việc hiển thị thông báo lỗi khi người dùng bỏ trống trường Giá phòng', async ({ page }) => {
  // Dữ liệu để test
  const roomNumber = "515";
  const floor = room_data.floor;
  const capacity = room_data.capacity;
  const price ="";
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  const msg = await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  await expect(msg).toBe("Please fill out this field.")
  
}); 

// TC_04
test('TC_CRTROOM_04 - Kiểm tra việc nhập ký tự bắt đầu cho trường Số phòng là chữ', async ({ page }) => {
  // Dữ liệu để test
  const roomNumber = "P312";
  const floor = room_data.floor;
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  
  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Số phòng không hợp lệ')
  expect(result).toBe('Số phòng không hợp lệ');
}); 


test('TC_CRTROOM_09 - Kiểm tra việc tạo phòng với số phòng đã tồn tại', async({page}) => {
  // Dữ liệu để test
  const roomNumber = room_data.roomNumber;  // số phòng đã tồn tại
  const floor = room_data.floor;
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Số phòng đã tồn tại')
  expect(result).toBe('Số phòng đã tồn tại');
})

test('TC_CRTROOM_10 - Kiểm tra chức năng tạo phòng khi nhập ký tự đặc biệt cho trường số phòng', async({page}) => {
  // Dữ liệu để test
  const roomNumber = '@1234@';  
  const floor = room_data.floor;
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Số phòng không hợp lệ')
  expect(result).toBe('Số phòng không hợp lệ');
})

test('TC_CRTROOM_11 - Kiểm tra chức năng tạo phòng khi nhập ký tự space cho trường số phòng', async() => {
  // Dữ liệu để test
  const roomNumber = '      '; 
  const floor = room_data.floor;
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Số phòng không hợp lệ')
  expect(result).toBe('Số phòng không hợp lệ');
})

test('TC_CRTROOM_12 - Kiểm tra giới hạn ô nhập dữ liệu cho trường số phòng', async() => {
  // Dữ liệu để test
  const roomNumber = room_data.roomNumberLimit; 
  const floor = room_data.floor;
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Số phòng không hợp lệ')
  expect(result).toBe('Số phòng không hợp lệ');
})

test('TC_CRTROOM_13 - Kiểm tra việc nhập Tầng khác với Số phòng', async() => {
  // Dữ liệu để test
  const roomNumber = '332'; 
  const floor = '2';
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Số phòng và Tầng không khớp')
  expect(result).toBe('Số phòng và Tầng không khớp');
})

test('TC_CRTROOM_14 - Kiểm tra việc giá trị âm cho trường Tầng', async() => {
  // Dữ liệu để test
  const roomNumber = '227'; 
  const floor = '-2';
  const capacity = room_data.capacity;
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Tầng phải nằm trong khoảng 1 đến 10')
  expect(result).toBe('Tầng phải nằm trong khoảng 1 đến 10');
})

test('TC_CRTROOM_15 - Kiểm tra việc nhập trường Tầng có độ dài > 10 ký tự', async() => {
  // Dữ liệu để test
  const roomNumber = '419'; 
  const floor = '12312312345';  // nhap 11 ky tu cho truong tang
  const capacity = room_data.capacity;
  const price = room_data.price;
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  const actualLenght = await createRoomPage.getLimit2Character(roomNumber, floor, capacity, price, building, type);
  console.log(`Độ dài ký tự thực tế của input floor là: ${actualLenght}`)
  const result = await createRoomPage.aserrtGetMessage('Thêm phòng mới thành công')  // Thêm phòng mới thành công nếu hệ thống tự động giới hạn ký tự floor
  console.log(`Thông báo lỗi: ${result}`)
  await expect(actualLenght).toBeLessThanOrEqual(2); // đảm bảo chỉ còn lại 2 ký tự

  // const result = await createRoomPage.aserrtGetMessage('Giá phòng không hợp lệ')
  // expect(result).toBe('Giá phòng không hợp lệ');
})

test('TC_CRTROOM_16 - Kiểm tra việc nhập bắt đầu ký tự 0 cho trường Tầng', async() => {
  // Dữ liệu để test
  const roomNumber = '129'; 
  const floor = '010';
  const capacity = room_data.capacity;
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Thêm phòng mới thành công')
  expect(result).toBe('Thêm phòng mới thành công');
})

test('TC_CRTROOM_17 - Kiểm tra việc giá trị âm cho trường Sức chứa', async() => {
  // Dữ liệu để test
  const roomNumber = '199'; 
  const floor = '2';
  const capacity = "-8";
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[0].value; // "R1"
  const type = room_data.typeOptions[0].value; // "standard"

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Sức chứa không hợp lệ')
  expect(result).toBe('Sức chứa không hợp lệ');
})


test('TC_CRTROOM_18 - Kiểm tra việc nhập giá trị vượt ngưỡng tối đa cho trường Sức chứa', async() => {
  // Dữ liệu để test
  const roomNumber = '449'; 
  const floor = '4';
  const capacity = "12";
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[1].value; // "R2"
  const type = room_data.typeOptions[1].value; 

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Sức chứa không hợp lệ')
  expect(result).toBe('Sức chứa không hợp lệ');
})

test('TC_CRTROOM_19 - Kiểm tra nhập bắt đầu với số 0 cho trường Sức chứa', async() => {
  // Dữ liệu để test
  const roomNumber = '373'; 
  const floor = '5';
  const capacity = "01";
  const price = room_data.price;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[1].value; // "R2"
  const type = room_data.typeOptions[1].value; 

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Thêm phòng mới thành công')
  expect(result).toBe('Thêm phòng mới thành công');
})

test('TC_CRTROOM_20 - Kiểm tra việc nhập giá trị âm cho trường Giá phòng', async() => {
  // Dữ liệu để test
  const roomNumber = '116'; 
  const floor = '5';
  const capacity = "01";
  const price = room_data.price_invalid;  //-1000
  // Lấy giá trị cụ thể từ mảng options
  const building = room_data.buildingOptions[1].value; // "R2"
  const type = room_data.typeOptions[1].value; 

  await homePage.goToCreateRoomPage();
  await createRoomPage.clickButtonCreateRoom();
  await createRoomPage.createRoom(roomNumber, floor, capacity, price, building, type);
  const result = await createRoomPage.aserrtGetMessage('Giá phòng không hợp lệ')
  expect(result).toBe('Giá phòng không hợp lệ');
})