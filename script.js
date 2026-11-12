// 導覽列手機版選單
document.querySelector(".menu-toggle")?.addEventListener("click", () => {
  document.querySelector(".site-header nav")?.classList.toggle("open");
});

// 聯絡表單：請將下方網址換成部署後的 Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = document.getElementById("formStatus");
    const button = form.querySelector("button[type='submit']");
    const label = button.querySelector(".submit-label");
    if (GOOGLE_SCRIPT_URL.startsWith("YOUR_")) {
      status.textContent = "表單版型已完成，請先設定 Google Apps Script 網址後即可正式收件。";
      return;
    }
    button.disabled = true;
    label.textContent = "傳送中…";
    status.textContent = "";
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      // 使用 no-cors 以相容 Google Apps Script Web App；瀏覽器無法讀取回應本文。
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams(data).toString()
      });
      status.textContent = "感謝你的訊息！表單已送出，期待與你聯繫。";
      form.reset();
    } catch (error) {
      status.textContent = "目前無法送出，請稍後再試，或直接以 Email 聯絡我們。";
    } finally {
      button.disabled = false;
      label.textContent = "送出訊息";
    }
  });
}