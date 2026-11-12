/**
 * NEON 聯絡表單通知
 * 1. 將此程式貼到 https://script.google.com 的新專案
 * 2. 修改 NOTIFY_EMAIL 為接收通知的 Gmail
 * 3. 部署 > 新增部署 > 網頁應用程式
 *    執行身分：我；誰可以存取：所有人
 * 4. 複製 Web App URL，貼到網站 script.js 的 GOOGLE_SCRIPT_URL
 */

const NOTIFY_EMAIL = "your-email@gmail.com"; // ← 改成實際收件信箱
const SITE_NAME = "NEON 數位創新工作室";

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    const name = clean(p.name);
    const email = clean(p.email);
    const phone = clean(p.phone);
    const service = clean(p.service);
    const message = clean(p.message);

    if (!name || !email || !service || !message || p.consent !== "on") {
      return output({ success: false, message: "請完整填寫必填欄位並同意資料使用說明。" });
    }

    const subject = "【網站新詢問】" + name + "｜" + service;
    const body = [
      SITE_NAME + " 收到一筆新的網站聯絡表單：",
      "",
      "姓名：" + name,
      "Email：" + email,
      "電話：" + (phone || "未提供"),
      "服務項目：" + service,
      "",
      "專案簡介：",
      message,
      "",
      "— 此郵件由 Google Apps Script 自動寄送 —"
    ].join("\n");

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: body,
      replyTo: email,
      name: SITE_NAME
    });

    // 可選：寄送一封簡短確認信給填表者
    MailApp.sendEmail({
      to: email,
      subject: "已收到你的訊息｜" + SITE_NAME,
      body: name + " 您好：\n\n感謝您聯絡 " + SITE_NAME + "！我們已收到您的需求，將盡快與您聯繫。\n\n祝順心\n" + SITE_NAME,
      name: SITE_NAME
    });

    return output({ success: true, message: "已成功送出。" });
  } catch (err) {
    return output({ success: false, message: "系統發生錯誤：" + err.message });
  }
}

function clean(value) {
  return String(value || "").trim().slice(0, 5000);
}

function output(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// 可在 Apps Script 編輯器手動執行一次，完成 Gmail 寄信授權
function authorizeMail() {
  MailApp.getRemainingDailyQuota();
}