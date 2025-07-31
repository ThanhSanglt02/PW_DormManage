import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path'; 
import dayjs from 'dayjs';

// Khởi tạo biến test mới từ base.extend
export const test = base.extend({});

// beforeEach, afterEach
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login'); 
    console.log('Đã mở trang web trước khi chạy test');
  });

test.afterEach(async ({}, testInfo) => {
    const actual = testInfo.annotations.find(a => a.type === 'actual')?.description || 'N/A';
    const expected = testInfo.annotations.find(a => a.type === 'expected')?.description || 'N/A';

    const result = {
        title: testInfo.title,
        status: testInfo.status,
        duration: `${testInfo.duration}ms`,
        expectedStatus: testInfo.expectedStatus,
        expected,
        actual, 
        time: dayjs().format('DD/MM/YYYY HH:mm:ss')
    };

    const outputDir = path.join(__dirname, '../output');
    const testFile = testInfo.file;
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
        console.warn(`⚠️ File log lỗi JSON: ${e.message}`);
        // Rename file cũ để khỏi mất dữ liệu
        fs.renameSync(logFile, logFile + `.bak_${Date.now()}`);
        existing = [];
    }
    }
    existing.push(result);
    fs.writeFileSync(logFile, JSON.stringify(existing, null, 2)); //writeFileSync tự động tạo file mới nếu file chưa tồn tại.

    console.log(`Đã ghi kết quả test: ${result.title}`);
});

