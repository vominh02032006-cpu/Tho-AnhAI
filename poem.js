// ===== POEM DETAIL PAGE =====
const params = new URLSearchParams(window.location.search);
const poemId = params.get("id");
const poem = getPoemById(poemId);
const container = document.getElementById("poemPage");
let liked = false; // khai báo ngoài để toggleLike truy cập được

if (!poem) {
  container.innerHTML = `
    <div class="poem-loading">
      <div style="font-size:3rem">😔</div>
      <h2>Không tìm thấy bài thơ</h2>
      <p>Bài thơ này không tồn tại hoặc đã bị xóa.</p>
      <a href="gallery.html" class="btn-primary" style="margin-top:20px">Quay Lại Thư Viện</a>
    </div>`;
} else {
  document.title = `"${poem.title}" — PoetryAI`;
  incCount(poem.id, 'views');

  const related = getRelatedPoems(poem.id, poem.category, 3);
  const poemLines = poem.poem.split("\n").map(l => l.trim() ? `<span>${l}</span>` : `<br />`).join("<br />");

  container.innerHTML = `
      <a href="index.html">Trang Chủ</a> <span>›</span>
      <a href="gallery.html">Thư Viện</a> <span>›</span>
      <a href="gallery.html?cat=${poem.category}">${poem.tag}</a> <span>›</span>
      <span>${poem.title}</span>
    </div>

    <div class="poem-hero">
      <div class="poem-hero-img">
        <img src="${imgUrlSmart(poem.seed, 800, 700)}" alt="${poem.title}" />
      </div>
      <div class="poem-hero-content">
        <span class="poem-category-tag">${poem.tag}</span>
        <h1>"${poem.title}"</h1>
        <div class="poem-full-text">${poemLines}</div>
        <div class="poem-info-row">
          <span class="poem-info-badge">📝 ${poem.style}</span>
          <span class="poem-info-badge">💭 ${poem.mood}</span>
          <span class="poem-info-badge">🤖 PoetryAI</span>
        </div>
        <div class="poem-actions">
          <button class="poem-action-btn like-btn" id="likeBtn" onclick="toggleLike()">
            <span class="like-icon">❤</span>
            <span>Yêu Thích</span>
            <span class="like-count" id="likeCountWrap" style="display:none">0</span>
          </button>
          <button class="poem-action-btn" onclick="copyPoemDetail()">📋 Sao Chép</button>
          <button class="poem-action-btn" onclick="sharePoemDetail()">🔗 Chia Sẻ</button>
          <button class="poem-action-btn" onclick="downloadPoemDetail()">⬇ Tải Về</button>
        </div>
      </div>
    </div>

    <div class="poem-stats-bar" id="statsBar"></div>

    <!-- COMMENTS SECTION -->
    <div class="comments-section">
      <div class="comments-header">
        <h2>Bình Luận <span class="comments-count" id="commentsCount"></span></h2>
      </div>

      <div class="comment-form-wrap">
        <div class="comment-avatar">✦</div>
        <div class="comment-form">
          <input type="text" id="commentName" placeholder="Tên của bạn..." maxlength="40" />
          <textarea id="commentText" placeholder="Chia sẻ cảm nhận của bạn về bài thơ này..." rows="3" maxlength="500"></textarea>
          <div class="comment-form-footer">
            <span class="comment-char" id="commentChar">0/500</span>
            <button class="btn-comment-submit" onclick="submitComment()">Gửi Bình Luận</button>
          </div>
        </div>
      </div>

      <div class="comments-list" id="commentsList"></div>
    </div>

    <!-- RELATED -->
    <div class="poem-related">
      <div class="section-header">
        <span class="section-tag">Có Thể Bạn Thích</span>
        <h2>Bài Thơ<br /><em>Liên Quan</em></h2>
      </div>
      <div class="related-grid">
        ${related.map(r => `
          <a href="poem.html?id=${r.id}" class="related-card">
            <img src="${imgUrlSmart(r.seed, 400, 240)}" alt="${r.title}" loading="lazy" />
            <div class="related-body">
              <span class="card-tag">${r.tag}</span>
              <h4>"${r.title}"</h4>
              <p>${r.poem.split("\n")[0]}</p>
            </div>
          </a>`).join("")}
      </div>
    </div>`;

  refreshLikeBtn();
  refreshStatsBar();
  renderComments();

  // Char count cho textarea
  document.getElementById("commentText").addEventListener("input", function() {
    document.getElementById("commentChar").textContent = `${this.value.length}/500`;
  });
}

// ── LIKE ──
function toggleLike() {
  if (!poem) return;
  liked = !liked;
  const btn = document.getElementById("likeBtn");
  if (liked) {
    incCount(poem.id, 'likes');
  } else {
    const cur = getCount(poem.id, 'likes');
    if (cur > 0) localStorage.setItem(`poem_${poem.id}_likes`, cur - 1);
  }
  btn.classList.toggle("liked", liked);
  refreshLikeBtn();
  refreshStatsBar();
  showToast(liked ? "Đã thêm vào yêu thích ❤" : "Đã bỏ yêu thích");
}

function refreshLikeBtn() {
  const n = getCount(poem.id, 'likes');
  const wrap = document.getElementById("likeCountWrap");
  if (!wrap) return;
  if (n > 0) {
    wrap.textContent = n.toLocaleString();
    wrap.style.display = "inline";
  } else {
    wrap.style.display = "none";
  }
}

// ── STATS BAR ──
function refreshStatsBar() {
  const bar = document.getElementById("statsBar");
  if (!bar) return;
  const likes    = getCount(poem.id, 'likes');
  const comments = getCount(poem.id, 'comments');
  const views    = getCount(poem.id, 'views');
  const parts = [];
  if (views > 0)    parts.push(`<div class="ps-item">👁 <span class="ps-num">${views.toLocaleString()}</span> lượt xem</div>`);
  if (likes > 0)    parts.push(`<div class="ps-item">❤ <span class="ps-num">${likes.toLocaleString()}</span> yêu thích</div>`);
  if (comments > 0) parts.push(`<div class="ps-item">💬 <span class="ps-num">${comments}</span> bình luận</div>`);
  bar.innerHTML = parts.join("");
}

// ── COMMENTS ──
function getComments() {
  try { return JSON.parse(localStorage.getItem(`poem_${poem.id}_comments_list`) || "[]"); }
  catch { return []; }
}

function saveComments(list) {
  localStorage.setItem(`poem_${poem.id}_comments_list`, JSON.stringify(list));
  localStorage.setItem(`poem_${poem.id}_comments`, list.length);
}

function submitComment() {
  const nameEl = document.getElementById("commentName");
  const textEl = document.getElementById("commentText");
  const name = nameEl.value.trim();
  const text = textEl.value.trim();

  if (!text) { showToast("Vui lòng nhập nội dung bình luận."); return; }

  const list = getComments();
  list.unshift({
    id: Date.now(),
    name: name || "Ẩn danh",
    text,
    time: new Date().toLocaleString("vi-VN", { day:"2-digit", month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit" }),
    likes: 0
  });
  saveComments(list);

  nameEl.value = "";
  textEl.value = "";
  document.getElementById("commentChar").textContent = "0/500";

  renderComments();
  refreshStatsBar();
  showToast("Đã gửi bình luận!");
}

function likeComment(id) {
  const list = getComments();
  const c = list.find(c => c.id === id);
  if (c) {
    c.likes = (c.likes || 0) + 1;
    saveComments(list);
    renderComments();
  }
}

function deleteComment(id) {
  const list = getComments().filter(c => c.id !== id);
  saveComments(list);
  renderComments();
  refreshStatsBar();
  showToast("Đã xóa bình luận.");
}

function renderComments() {
  const list = getComments();
  const el = document.getElementById("commentsList");
  const countEl = document.getElementById("commentsCount");
  if (!el) return;

  if (countEl) countEl.textContent = list.length > 0 ? `(${list.length})` : "";

  if (list.length === 0) {
    el.innerHTML = `<div class="no-comments">Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nhận!</div>`;
    return;
  }

  el.innerHTML = list.map(c => `
    <div class="comment-item" id="cmt-${c.id}">
      <div class="comment-avatar-sm">${c.name.charAt(0).toUpperCase()}</div>
      <div class="comment-body">
        <div class="comment-meta">
          <span class="comment-name">${escHtml(c.name)}</span>
          <span class="comment-time">${c.time}</span>
        </div>
        <p class="comment-text">${escHtml(c.text)}</p>
        <div class="comment-actions">
          <button class="cmt-btn" onclick="likeComment(${c.id})">
            ❤ ${c.likes > 0 ? c.likes : "Thích"}
          </button>
          <button class="cmt-btn cmt-delete" onclick="deleteComment(${c.id})">🗑 Xóa</button>
        </div>
      </div>
    </div>`).join("");
}

function escHtml(str) {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ── COPY / SHARE / DOWNLOAD ──
function copyPoemDetail() {
  if (!poem) return;
  navigator.clipboard.writeText(`"${poem.title}"\n\n${poem.poem}\n\n— PoetryAI`);
  showToast("Đã sao chép bài thơ!");
}
function sharePoemDetail() {
  if (!poem) return;
  if (navigator.share) {
    navigator.share({ title: `"${poem.title}" — PoetryAI`, text: poem.poem, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast("Đã sao chép link chia sẻ!");
  }
}
function downloadPoemDetail() {
  if (!poem) return;
  const blob = new Blob([`"${poem.title}"\n\n${poem.poem}\n\n— PoetryAI`], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${poem.title.toLowerCase().replace(/\s+/g, "-")}.txt`;
  a.click();
}
