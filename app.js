// ===== SHARED UTILITIES =====

// Hiển thị trạng thái đăng nhập trên nav
(function updateNavAuth() {
  const name = sessionStorage.getItem("userName");
  const type = sessionStorage.getItem("userType");
  const navBtn = document.querySelector(".btn-nav");
  if (!navBtn) return;
  if (name) {
    const icon = type === "guest" ? "👤" : type === "google" ? "G" : "f";
    navBtn.textContent = `${icon} ${name}`;
    navBtn.style.background = type === "guest" ? "var(--text-light)" : "var(--brown)";
    navBtn.href = "auth.html";
  }
})();

// Page transition — fade out khi click link sang trang khác
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  // Chỉ xử lý link nội bộ .html, không phải anchor (#) hay external
  if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
  e.preventDefault();
  document.body.style.transition = "opacity 0.25s ease, transform 0.25s ease";
  document.body.style.opacity = "0";
  document.body.style.transform = "translateY(-6px)";
  setTimeout(() => { window.location.href = href; }, 260);
});

// Nav scroll shadow
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (nav) nav.style.boxShadow = window.scrollY > 20 ? "0 4px 20px rgba(26,20,16,0.1)" : "none";
});

// Toast notification
function showToast(msg, duration = 2500) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// Newsletter subscribe
function subscribeNewsletter(btn) {
  const input = btn.previousElementSibling;
  if (!input.value || !input.value.includes("@")) {
    showToast("Vui lòng nhập email hợp lệ.");
    return;
  }
  btn.textContent = "✓";
  btn.style.background = "#4caf50";
  input.value = "";
  showToast("Đăng ký thành công! Cảm ơn bạn.");
}

// Format number
function fmtNum(n) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toString();
}

// Render a standard card (dùng cho home latest & gallery)
function renderCard(p, linkClass = "latest-card") {
  const lines = p.poem.split("\n").slice(0, 2).join("<br />");
  const meta = buildMeta(p.id);
  return `
    <a href="poem.html?id=${p.id}" class="${linkClass}">
      <img src="${imgUrlSmart(p.seed, 400, 280)}" alt="${p.title}" loading="lazy" />
      <div class="${linkClass === 'latest-card' ? 'latest-body' : 'masonry-body'}">
        <span class="card-tag">${p.tag}</span>
        <h3>"${p.title}"</h3>
        <p>${lines}</p>
        <div class="${linkClass === 'latest-card' ? 'card-meta' : 'masonry-meta'}">${meta}</div>
      </div>
    </a>`;
}

// Tạo meta từ localStorage (chỉ hiện nếu > 0)
function buildMeta(id) {
  const likes = getCount(id, 'likes');
  const views = getCount(id, 'views');
  const comments = getCount(id, 'comments');
  const parts = [];
  if (likes > 0)    parts.push(`❤ ${fmtNum(likes)}`);
  if (comments > 0) parts.push(`💬 ${comments}`);
  if (views > 0)    parts.push(`👁 ${fmtNum(views)}`);
  return parts.join('<span class="meta-sep"> · </span>');
}

// LocalStorage helpers
function getCount(id, type) {
  return parseInt(localStorage.getItem(`poem_${id}_${type}`) || "0");
}
function incCount(id, type) {
  const val = getCount(id, type) + 1;
  localStorage.setItem(`poem_${id}_${type}`, val);
  return val;
}

// ===== HAMBURGER MENU =====
(function initHamburger() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  // Tạo hamburger button
  const ham = document.createElement("button");
  ham.className = "nav-hamburger";
  ham.setAttribute("aria-label", "Menu");
  ham.innerHTML = `<span></span><span></span><span></span>`;
  nav.appendChild(ham);

  // Tạo mobile menu từ nav-links hiện có
  const links = nav.querySelector(".nav-links");
  const btnNav = nav.querySelector(".btn-nav");
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "nav-mobile-menu";

  if (links) {
    links.querySelectorAll("a").forEach(a => {
      const clone = a.cloneNode(true);
      mobileMenu.appendChild(clone);
    });
  }
  if (btnNav) {
    const mobileBtn = document.createElement("a");
    mobileBtn.href = btnNav.href || "auth.html";
    mobileBtn.className = "btn-nav-mobile";
    mobileBtn.textContent = btnNav.textContent;
    mobileMenu.appendChild(mobileBtn);
  }
  document.body.appendChild(mobileMenu);

  // Toggle
  ham.addEventListener("click", () => {
    ham.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  // Đóng khi click link
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      ham.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });

  // Đóng khi click ngoài
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
      ham.classList.remove("open");
      mobileMenu.classList.remove("open");
    }
  });
})();
