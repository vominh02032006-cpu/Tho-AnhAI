// ===== AUTH PAGE LOGIC =====

// Page transition
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("http")) return;
  // Cho phép các link trong form xử lý bình thường (onclick="return false")
  if (link.getAttribute("onclick") && link.getAttribute("onclick").includes("return false")) return;
  e.preventDefault();
  document.body.style.transition = "opacity 0.25s ease, transform 0.25s ease";
  document.body.style.opacity = "0";
  document.body.style.transform = "translateY(-6px)";
  setTimeout(() => { window.location.href = href; }, 260);
});

// ── Tab switching ──
function switchTab(tab) {
  const indicator = document.getElementById("tabIndicator");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const panelLogin = document.getElementById("panelLogin");
  const panelRegister = document.getElementById("panelRegister");
  const panelForgot = document.getElementById("panelForgot");

  // Hide forgot panel if switching tabs
  panelForgot.classList.add("hidden");

  if (tab === "login") {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    indicator.classList.remove("right");
    panelLogin.classList.remove("hidden");
    panelRegister.classList.add("hidden");
  } else {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    indicator.classList.add("right");
    panelRegister.classList.remove("hidden");
    panelLogin.classList.add("hidden");
  }
}

// ── Show forgot password ──
function showForgot(e) {
  e.preventDefault();
  document.getElementById("panelLogin").classList.add("hidden");
  document.getElementById("panelForgot").classList.remove("hidden");
}

// ── Toggle password visibility ──
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈";
  } else {
    input.type = "password";
    btn.textContent = "👁";
  }
}

// ── Password strength checker ──
function checkPasswordStrength(val) {
  const fill = document.getElementById("pwFill");
  const label = document.getElementById("pwLabel");
  if (!fill || !label) return;

  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { pct: "0%",   color: "transparent", text: "Nhập mật khẩu" },
    { pct: "25%",  color: "#e05252",     text: "Yếu" },
    { pct: "50%",  color: "#f0a500",     text: "Trung bình" },
    { pct: "75%",  color: "#4caf50",     text: "Mạnh" },
    { pct: "100%", color: "#2e7d32",     text: "Rất mạnh" },
  ];

  const lvl = val.length === 0 ? levels[0] : levels[score] || levels[1];
  fill.style.width = lvl.pct;
  fill.style.background = lvl.color;
  label.textContent = lvl.text;
  label.style.color = lvl.color === "transparent" ? "var(--text-light)" : lvl.color;
}

// ── Validate email ──
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Show field error ──
function setFieldState(inputId, state, msg = "") {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.classList.remove("error", "success");
  // Remove old error msg
  const old = input.closest(".field-group")?.querySelector(".field-error");
  if (old) old.remove();

  if (state === "error") {
    input.classList.add("error");
    const err = document.createElement("div");
    err.className = "field-error show";
    err.textContent = msg;
    input.closest(".field-wrap").after(err);
  } else if (state === "success") {
    input.classList.add("success");
  }
}

// ── Toast ──
function showToast(msg, duration = 3000) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), duration);
}

// ── Handle Login ──
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  let valid = true;

  if (!isValidEmail(email)) {
    setFieldState("loginEmail", "error", "Email không hợp lệ.");
    valid = false;
  } else {
    setFieldState("loginEmail", "success");
  }

  if (password.length < 6) {
    setFieldState("loginPassword", "error", "Mật khẩu phải có ít nhất 6 ký tự.");
    valid = false;
  } else {
    setFieldState("loginPassword", "success");
  }

  if (!valid) return;

  const btn = document.getElementById("loginBtn");
  btn.classList.add("loading");
  btn.querySelector(".submit-text").textContent = "Đang đăng nhập...";

  // Simulate API call
  setTimeout(() => {
    btn.classList.remove("loading");
    btn.querySelector(".submit-text").textContent = "Đăng Nhập";
    showSuccessPanel("Đăng nhập thành công! 🎉", `Chào mừng bạn trở lại PoetryAI, ${email.split("@")[0]}.`);
  }, 1500);
}

// ── Handle Register ──
function handleRegister(e) {
  e.preventDefault();
  const firstName = document.getElementById("regFirstName").value.trim();
  const lastName = document.getElementById("regLastName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirm = document.getElementById("regConfirm").value;
  const agree = document.getElementById("agreeTerms").checked;
  let valid = true;

  if (!lastName) { setFieldState("regLastName", "error", "Vui lòng nhập họ."); valid = false; }
  else setFieldState("regLastName", "success");

  if (!firstName) { setFieldState("regFirstName", "error", "Vui lòng nhập tên."); valid = false; }
  else setFieldState("regFirstName", "success");

  if (!isValidEmail(email)) { setFieldState("regEmail", "error", "Email không hợp lệ."); valid = false; }
  else setFieldState("regEmail", "success");

  if (password.length < 8) { setFieldState("regPassword", "error", "Mật khẩu phải có ít nhất 8 ký tự."); valid = false; }
  else setFieldState("regPassword", "success");

  if (confirm !== password) { setFieldState("regConfirm", "error", "Mật khẩu xác nhận không khớp."); valid = false; }
  else if (confirm) setFieldState("regConfirm", "success");

  if (!agree) { showToast("Vui lòng đồng ý với điều khoản dịch vụ."); valid = false; }

  if (!valid) return;

  const btn = document.getElementById("registerBtn");
  btn.classList.add("loading");
  btn.querySelector(".submit-text").textContent = "Đang tạo tài khoản...";

  setTimeout(() => {
    btn.classList.remove("loading");
    btn.querySelector(".submit-text").textContent = "Tạo Tài Khoản";
    showSuccessPanel(
      "Tài khoản đã được tạo! ✦",
      `Chào mừng ${lastName} ${firstName} đến với PoetryAI. Hãy bắt đầu hành trình thơ ca của bạn!`
    );
  }, 1800);
}

// ── Handle Forgot Password ──
function handleForgot(e) {
  e.preventDefault();
  const email = document.getElementById("forgotEmail").value.trim();
  if (!isValidEmail(email)) {
    setFieldState("forgotEmail", "error", "Email không hợp lệ.");
    return;
  }
  setFieldState("forgotEmail", "success");
  showToast(`Đã gửi link đặt lại mật khẩu đến ${email} ✉`);
  setTimeout(() => switchTab("login"), 2000);
}

// ── Social Login ──
function socialLogin(provider) {
  const btn = event.currentTarget;
  const originalText = btn.innerHTML;
  btn.innerHTML = `<span style="opacity:.6">Đang kết nối...</span>`;
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    // Lưu thông tin user giả lập
    const mockName = provider === 'Google' ? 'Người dùng Google' : 'Người dùng Facebook';
    sessionStorage.setItem("userName", mockName);
    sessionStorage.setItem("userType", provider.toLowerCase());
    showSuccessPanel(`Đăng nhập với ${provider} thành công! 🎉`, `Chào mừng bạn đến với PoetryAI.`);
  }, 1500);
}

// ── Guest Login ──
function guestLogin() {
  sessionStorage.setItem("userName", "Khách");
  sessionStorage.setItem("userType", "guest");
  showSuccessPanel("Chào mừng khách! 👋", "Bạn đang lướt với tư cách khách. Một số tính năng sẽ bị giới hạn.");
}

// ── Show success panel ──
function showSuccessPanel(title, msg) {
  document.querySelectorAll(".auth-panel").forEach(p => p.classList.add("hidden"));
  document.getElementById("successTitle").textContent = title;
  document.getElementById("successMsg").textContent = msg;

  const isGuest = sessionStorage.getItem("userType") === "guest";
  const successPanel = document.getElementById("panelSuccess");
  // Thêm nút đăng nhập nếu là khách
  const extraBtn = successPanel.querySelector(".guest-note");
  if (extraBtn) extraBtn.remove();
  if (isGuest) {
    const note = document.createElement("p");
    note.className = "guest-note";
    note.style.cssText = "font-size:.8rem;color:var(--text-light);margin-top:12px;text-align:center";
    note.innerHTML = `<a href="#" onclick="switchTab('register');document.querySelector('.auth-tabs').style.display='';return false;" style="color:var(--brown)">Đăng ký tài khoản</a> để lưu thơ và bình luận.`;
    successPanel.querySelector(".success-content").appendChild(note);
  }

  successPanel.classList.remove("hidden");
  document.querySelector(".auth-tabs").style.display = "none";
}

// ── Check URL param for default tab ──
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("tab") === "register") {
  switchTab("register");
}
