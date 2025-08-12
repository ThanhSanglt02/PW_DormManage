import {test} from '../tests/base_test.spec';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';



const user_data = require('../common/testData/user_data.json')
const common = require('../common/Common');


test.describe('test permission rule', ()=> {
    test('TC_CRTROOM_11 - Kiểm tra việc tạo phòng khi không đăng nhập', async({page}, testInfo) => {
      // không login
      
      await page.pause()
      // Truy cập url tao phong cua Admin
      await page.goto('http://localhost:3000/admin/room-registration'); 

      const autualLink = await page.url();

      common.getTestInfo(testInfo, "http://localhost:3000/login", autualLink)

      // Kiểm tra đã bị chuyển hướng sang trang khác
      await expect(page).toHaveURL(/\/login$/);
    
      // kiểm tra không còn ở trang /create-room nữa
      await expect(page).not.toHaveURL(/\/room-registration$/);  //kiểm tra URL hiện tại không kết thúc bằng /room-registration
    
      
    })
    
    test('TC_CRTROOM_12 - Kiểm tra việc tạo phòng khi login với role Student', async({page}, testInfo) => {
      const loginPage = new LoginPage(page);
      // Đăng nhập với role Student
      await loginPage.login(user_data.studentUser.username, user_data.studentUser.password)
    
      // Truy cập url tao phong cua Admin
      await page.goto('http://localhost:3000/admin/room-registration');
      const autualLink = await page.url();

      // Gán actual/expected vào testInfo
      common.getTestInfo(testInfo, "http://localhost:3000/login", autualLink)

      // Kiểm tra đã bị chuyển hướng sang trang khác
      await expect(page).toHaveURL(/\/login$/);
    
      // kiểm tra không còn ở trang /create-room nữa
      await expect(page).not.toHaveURL(/\/room-registration$/);  //kiểm tra URL hiện tại không kết thúc bằng /room-registration
    
    
    });
  })