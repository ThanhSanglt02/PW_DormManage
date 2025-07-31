const { HomePage } = require("./HomePage");

const register_locator = require('../common/locators/registerStudent_locator.json')
const common = require('../common/Common')

exports.RegisterStudent = class RegisterStudent extends HomePage {

    constructor(page) {
        super(page)
    }

    async clickCardRoomManage() {
        await this.page.click(createRoomLocators.buttonCreateRoom);
    };
   
    async aserrtGetMessage(expected) {
        try {
            const locator = this.page.locator(register_locator.message);
            await locator.waitFor({ timeout: 3000 }); // chờ xuất hiện
    
            const actual = await locator.textContent();
            const actualTrimmed = actual?.trim();
            const expectedTrimmed = expected.trim();

            if (actualTrimmed === expectedTrimmed) {
                return actualTrimmed
            }
            return actualTrimmed

        } catch(e) {
            console.log(e.message) //"Không lấy được message | Hết session timeout"
            return 'failed'
        }
    };
   
    async fillToRegisterStudent(idStudent, fullName, dateofBirth, sex, adress, phone, email, sinhVienNamThu, passWord) {
        
        if (idStudent) {
            await this.page.fill(register_locator.idStudent, idStudent);
        }
        if (fullName) {
            await this.page.fill(register_locator.inputName, fullName);
        }
        if (dateofBirth) {
            if (!/[-]/.test(dateofBirth)) {
                console.log("Chuỗi không chứa ký tự -");  // vì FE xác định type là date --> format phải là yyyy-mm-dd
            }
            await this.page.fill(register_locator.dateofBirth, dateofBirth);
        }
        if (sex) {
            await this.page.click(register_locator.inputGioiTinh);    
            await this.selectValueSex(sex);
        }
        if (adress) {
            await this.page.fill(register_locator.inputAdress, adress);
        }
        if (phone) {
            await this.page.fill(register_locator.inputPhone, phone);
        }
        if (email) {
            await this.page.fill(register_locator.inputEmail, email);
        }
        if (sinhVienNamThu) {
            await this.page.click(register_locator.selectorSinhVienNamThu);
            await this.selectValueNamHoc(sinhVienNamThu);
        }
        if (passWord) {
            await this.page.fill(register_locator.inputPassword, passWord);
        }
    };

    async clickButtonRegister() {
        // click "Thêm"
        await this.page.click(register_locator.btnRegister);
        
    };
       
    async selectValueSex (value) {
        const locator = register_locator.valueGioiTinh.replace('${value}', value);
        await this.page.waitForSelector(locator, { timeout: 5000 });  // Đợi element load xong
        await this.page.click(locator);
    }
    async selectValueNamHoc (value) {
        const locator = register_locator.valueNamHoc.replace('${value}', value);
        await this.page.waitForSelector(locator, { timeout: 5000 });  // Đợi element load xong
        await this.page.click(locator);
    }

    
    
   
}
    