import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path'; 
import dayjs from 'dayjs';

// Khởi tạo biến test mới từ base.extend
// giống kết thứa file test với Selenium
export const test = base.extend({});

// beforeEach, afterEach
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login'); 
  });

test.afterEach(async ({}, testInfo) => {
    const actual = testInfo.annotations.find(a => a.type === 'actual')?.description || 'N/A';  // nếu hàm find không tìm thấy thì trả về undefined --> gắn giá trị N/A. Còn tìm thấy thì trả về description
    const expected = testInfo.annotations.find(a => a.type === 'expected')?.description || 'N/A';

    // kết quả khi chạy 1 test case cần log ra --> dùng testInfo
    const result = {
        title: testInfo.title,
        status: testInfo.status,
        duration: `${testInfo.duration}ms`,
        expectedStatus: testInfo.expectedStatus,
        expected,
        actual, 
        time: dayjs().format('DD/MM/YYYY HH:mm:ss')
    };

    // log file để ghi lại result cho mỗi test
    const outputDir = path.join(__dirname, '../output');
    const testFile = testInfo.file; // là file có gọi đến testInfo hay sử dụng testInfo
    const fileName = path.basename(testFile);
    const baseName = fileName.replace(/(\.spec)?\.js$/, '');
    const logFile = path.join(outputDir, `${baseName}_result.json`);

    // Tạo thư mục output nếu chưa có
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let existing = [];
    if (fs.existsSync(logFile)) {
    try {
        const content = fs.readFileSync(logFile, 'utf-8');
        existing = content ? JSON.parse(content) : [];
    } catch (e) {
        console.warn(`File log lỗi JSON: ${e.message}`);
        // Rename file cũ để khỏi mất dữ liệu
        fs.renameSync(logFile, logFile + `.bak_${Date.now()}`);
        existing = [];
    }
    }
    existing.push(result);
    fs.writeFileSync(logFile, JSON.stringify(existing, null, 2)); //writeFileSync tự động tạo file mới nếu file chưa tồn tại.

});

