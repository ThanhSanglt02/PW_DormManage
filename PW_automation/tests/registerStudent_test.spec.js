import {test} from '../tests/base_test.spec';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import {RegisterStudent} from '../pages/RegisterStudentPage'


const user_data = require('../common/testData/user_data.json')
const student_data = require('../common/testData/student_data.json');
const common = require('../common/Common');

let loginPage;
let homePage;
let registerPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    registerPage = new RegisterStudent(page);

    // // Login
    // loginPage.goToLoginPage()
    loginPage.login(user_data.validUser.username, user_data.validUser.password)
    // await page.goto('http://localhost:3000/admin');
    await homePage.goToRegisterStudentPage();

});

test('TC_RGSTUDENT_01 - Kiểm tra đăng ký sinh viên thành công với thông tin hợp lệ', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = student_data.idStudent;
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = student_data.email;
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[0].value;  // Năm 1
    const sex = student_data.sexOptions[0].value; // "Nam"

    // message expected
    const expectResult = student_data.messageRegisterSuccess //Đăng ký sinh viên thành công!

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)

    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)
    // testInfo.annotations.push({ type: 'actual', description: result });
    // testInfo.annotations.push({ type: 'expected', description: 'Đăng ký sinh viên thành công' });
    expect(result).toBe(expectResult);
    
}); 


test('TC_RGSTUDENT_02 - Kiểm tra đăng ký sinh viên khi nhập Mã sinh viên chỉ chứa chữ', async ({ page }, testInfo) => {
     // Dữ liệu để test
     const id = 'abbvcbcd';
     const fullName = student_data.fullName;
     const dateofBirth = student_data.dateofBirth;
     const phone = student_data.phone;
     const email = 'ddddddaa@gmail.com';
     const address = student_data.address;
     const passWord = student_data.passWord;
     
     // Lấy giá trị cụ thể từ mảng options
     const namHoc = student_data.namHocOptions[1].value;  // Năm 2
     const sex = student_data.sexOptions[1].value; // "Nữ"

     // message expected
    const expectResult = student_data.messageIdInvalid // Mã sinh viên không hợp lệ
 
     await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
     await registerPage.clickButtonRegister();
     const result = await registerPage.aserrtGetMessage(expectResult)

     // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)
    
     expect(result).toBe(expectResult);   
}); 

test('TC_RGSTUDENT_03 - Kiểm tra đăng ký sinh viên khi nhập Mã sinh viên chỉ chứa kí tự đặc biệt', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = '@@@@@@@'; 
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = 'abbchhhghgda@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

     // message expected
     const expectResult = student_data.messageIdInvalid // Mã sinh viên không hợp lệ
 
     await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
     await registerPage.clickButtonRegister();
     const result = await registerPage.aserrtGetMessage(expectResult)

     // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)
    
     expect(result).toBe(expectResult);  

}); 

test('TC_RGSTUDENT_04 - Kiểm tra khi đăng kí sinh viên với mã sinh viên đã tồn tại ', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = student_data.idStudent;  // max da ton tai
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = 'ssdahjkjkhjkha@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

     // message expected
     const expectResult = student_data.messageIdDuplicate // Mã sinh viên đã tồn tại

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)

     // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)
    expect(result).toBe(expectResult);  
    
}); 

test('TC_RGSTUDENT_05 - Kiểm tra việc đăng ký sv với nhiều ký tự space vào trường Mã sinh viên', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = '             ';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = 'sangcbhjajss@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messageIdInvalid // Mã sinh viên không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)

    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);   
    
}); 

test('TC_RGSTUDENT_06 - Kiểm tra việc đăng ký sv với Số điện thoại không bắt đầu với 0', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = '65432992';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = '1931442005';
    const email = 'dangarantooo@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messagePhoneInvalid // Số điện thoại không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)
    
    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)
    expect(result).toBe(expectResult);   
    
}); 

test('TC_RGSTUDENT_07 - Kiểm tra việc đăng ký sv với Số điện thoại < 10 ký tự', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = '0235631';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = '093782';
    const email = 'quandtuuuruur@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messagePhoneInvalid // Số điện thoại không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)

    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)
    expect(result).toBe(expectResult);   
    
}); 

test('TC_RGSTUDENT_08 - Kiểm tra việc đăng ký sv với Số điện thoại > 10 ký tự', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = '1131321312';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = '093545456782';
    const email = 'thydadsa@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messagePhoneInvalid // Số điện thoại không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)

    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);   
    
}); 

test('TC_RGSTUDENT_09 - Kiểm tra chức năng đăng ký khi nhập ký tự đặc biệt vào trường phone', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = '9222';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = '090@456782';
    const email = 'thynehahah@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messagePhoneInvalid // Số điện thoại không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)
    
     // Gán actual/expected vào testInfo
     common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);   
    
}); 

test('TC_RGSTUDENT_10 - Kiểm tra việc đăng ký với email đã tồn tại', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = '3431123';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = student_data.email;
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messageEmailDuplicate // Email đã tồn tại


    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)
    
     // Gán actual/expected vào testInfo
     common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);
    
}); 

test('TC_RGSTUDENT_11 - Kiểm tra thông báo lỗi khi nhập email sai định dạng', async ({ page }, testInfo) => {
    // Dữ liệu để test
    const id = '438993183832';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = 'sssssgmail@com.gmail';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messageEmailInvalid // Email không hợp lệ


    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)
    
     // Gán actual/expected vào testInfo
     common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);
    
}); 

test('TC_RGSTUDENT_12 - Kiểm tra thông báo lỗi khi nhập email sai định dạng', async ({ page }, testInfo) => {
    /// Dữ liệu để test
    const id = '100054305';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = 'sgmmmmmmail@com';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messageEmailInvalid // Email không hợp lệ


    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)

    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);
    
}); 


test('TC_RGSTUDENT_13 - Kiểm tra việc đăng ký sv với mật khẩu < 8 ký tự', async ({ page }, testInfo) => {
    /// Dữ liệu để test
    const id = '890904';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = 'tuhh@gmail.com';
    const address = student_data.address;
    const passWord = '1234567';
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messagePasswordInvalid // Mật khẩu không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)
    
    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);
    
}); 


test('TC_RGSTUDENT_14 - Kiểm tra việc đăng ký khi nhập 8 ký tự space vào trường password', async ({ page }, testInfo) => {
    /// Dữ liệu để test
    const id = '670011112';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = 'abhjk@gmail.com';
    const address = student_data.address;
    const passWord = '        ';  // 8 ký tự space
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messageRegisterSuccess //Đăng ký sinh viên thành công!

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)

    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)
    
    expect(result).toBe(expectResult);
        
}); 


test('TC_RGSTUDENT_15 - Kiểm tra việc đăng ký khi nhập < 8 ký tự space vào trường password', async ({ page }, testInfo) => {
    /// Dữ liệu để test
    const id = '87999966333';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirth;
    const phone = student_data.phone;
    const email = 'thanh231@gmail.com';
    const address = student_data.address;
    const passWord = '       '; // 7 ký tự space
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messagePasswordInvalid // Mật khẩu không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)
    
    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);
    
}); 


test('TC_RGSTUDENT_16 - Kiểm tra việc đăng ký khi chọn ngày sinh tương lai', async ({ page }, testInfo) => {
    /// Dữ liệu để test
    const id = '123213089098';  
    const fullName = student_data.fullName;
    const dateofBirth = student_data.dateofBirthInvalid; // 2028
    const phone = student_data.phone;
    const email = 'thanhnnnn@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord;
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messageDateInvalid // Ngày sinh không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)
    
     // Gán actual/expected vào testInfo
     common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);
    
}); 


test('TC_RGSTUDENT_17 - Kiểm tra khi nhập năm sinh > 4 ký tự ', async ({ page }, testInfo) => {
    /// Dữ liệu để test
    const id = '7777788888';  
    const fullName = student_data.fullName;
    const dateofBirth = '12-29-20277';
    const phone = student_data.phone;
    const email = 'sang555@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messageDateInvalid // Ngày sinh không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)
    
    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)
 
    expect(result).toBe(expectResult);
    
}); 


test('TC_RGSTUDENT_18 - Kiểm tra khi nhập năm sinh bắt đầu với 0', async ({ page }, testInfo) => {
    /// Dữ liệu để test
    const id = '1311308083432';  
    const fullName = student_data.fullName;
    const dateofBirth = '12-29-0012';
    const phone = student_data.phone;
    const email = 'hahahahah@gmail.com';
    const address = student_data.address;
    const passWord = student_data.passWord
    
    // Lấy giá trị cụ thể từ mảng options
    const namHoc = student_data.namHocOptions[1].value;  // Năm 2
    const sex = student_data.sexOptions[1].value; // "Nữ"

    // message expected
    const expectResult = student_data.messageDateInvalid // Ngày sinh không hợp lệ

    await registerPage.fillToRegisterStudent(id, fullName, dateofBirth, sex, address, phone, email, namHoc, passWord);
    await registerPage.clickButtonRegister();
    const result = await registerPage.aserrtGetMessage(expectResult)

    // Gán actual/expected vào testInfo
    common.getTestInfo(testInfo, expectResult, result)

    expect(result).toBe(expectResult);
    
}); 

