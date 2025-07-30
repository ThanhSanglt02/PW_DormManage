import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';



const user_data = require('../common/testData/user_data.json')


test.describe('test permission rule', ()=> {
    test('TC_CRTROOM_11 - Kiểm tra việc tạo phòng khi không đăng nhập', async({page}) => {
      // không login
      
      // Truy cập url tao phong cua Admin
      await page.goto('http://localhost:3000/admin/room-registration');
    
      // kiểm tra không còn ở trang /create-room nữa
      await expect(page).not.toHaveURL(/\/room-registration$/);  //kiểm tra URL hiện tại không kết thúc bằng /room-registration
    
      // Kiểm tra đã bị chuyển hướng sang trang khác
      await expect(page).toHaveURL(/\/login$/);
    })
    
    test('TC_CRTROOM_12 - Kiểm tra việc tạo phòng khi login với role Student', async({page}) => {
      const loginPage = new LoginPage(page);
      // Đăng nhập với role Student
      await loginPage.goToLoginPage()
      await loginPage.login(user_data.studentUser.username, user_data.studentUser.password)
    
      // Truy cập url tao phong cua Admin
      await page.goto('http://localhost:3000/admin/room-registration');
    
      // kiểm tra không còn ở trang /create-room nữa
      await expect(page).not.toHaveURL(/\/room-registration$/);  //kiểm tra URL hiện tại không kết thúc bằng /room-registration
    
      // Kiểm tra đã bị chuyển hướng sang trang khác
      await expect(page).toHaveURL(/\/login$/);
    
    });
  })