NEON 高科技風格網站｜GitHub Pages + Google Apps Script

【檔案內容】
index.html                 首頁
about.html                 關於我們
contact.html               聯絡我們（含表單）
style.css                  全站深色科技感版型與 RWD
script.js                  手機選單、表單送出程式
GoogleAppsScript.gs        Google Apps Script 郵件通知後端

【一、先設定收件 Email】
1. 前往 https://script.google.com
2. 建立「新增專案」。
3. 將 GoogleAppsScript.gs 全部內容貼入程式編輯器。
4. 修改最上方 NOTIFY_EMAIL = "your-email@gmail.com"，換成你要收到通知的 Email。
5. 儲存專案。

【二、部署 Google Apps Script】
1. 右上角「部署」→「新增部署」。
2. 類型選「網頁應用程式」。
3. 執行身分選「我」。
4. 誰可以存取選「所有人」（表單訪客才可送出）。
5. 按部署，依畫面完成 Google 帳戶授權。
6. 複製產生的 Web App URL（網址通常以 /exec 結尾）。

【三、連接網站表單】
1. 開啟 script.js。
2. 找到：
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
3. 將引號內文字替換成剛才複製的 Web App URL。
4. 儲存並重新上傳 GitHub。

【四、發布到 GitHub Pages】
1. 將本資料夾所有檔案上傳到 GitHub repository 根目錄。
2. Repository → Settings → Pages。
3. Build and deployment 選 Deploy from a branch。
4. Branch 選 main，資料夾選 /(root)，按 Save。
5. 等待 GitHub Pages 部署完成，使用顯示的網址瀏覽。

【測試】
- 進入網站 contact.html，填寫表單並送出。
- 檢查 NOTIFY_EMAIL 收件匣及垃圾郵件匣。
- 填表者也會收到一封確認信。

【重要提醒】
- 本範例採用 Google Apps Script + MailApp 寄送通知。
- 前端使用 no-cors 送出，因此瀏覽器無法讀取 Google 回傳的成功/失敗內容；頁面顯示的是送出請求後的提示，不等於郵件一定已送達。請以收件匣及 Apps Script 執行記錄確認。
- 正式上線建議加上垃圾表單防護、寄送頻率限制及隱私權政策。
- hello@neon-studio.example 是展示用假信箱，請替換成正式聯絡方式。
