// ===== GALLERY PAGE =====
let currentFilter = "all";
let currentSort = "likes";
let visibleCount = 12;

// Đọc query param ?cat=
const urlParams = new URLSearchParams(window.location.search);
const catParam = urlParams.get("cat");
if (catParam) {
  currentFilter = catParam;
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.toggle("active", t.dataset.filter === catParam);
  });
}

function getFiltered() {
  let data = currentFilter === "all" ? [...POEMS_DATA] : POEMS_DATA.filter(p => p.category === currentFilter);
  if (currentSort === "likes") data.sort((a, b) => b.likes - a.likes);
  else if (currentSort === "views") data.sort((a, b) => b.views - a.views);
  else data.sort((a, b) => b.id - a.id);
  return data;
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  const data = getFiltered().slice(0, visibleCount);

  // Masonry: vary heights by alternating tall/short images
  grid.innerHTML = data.map((p, i) => {
    const h = i % 3 === 0 ? 320 : i % 3 === 1 ? 240 : 280;
    const lines = p.poem.split("\n").slice(0, 2).join("<br />");
    return `
      <a href="poem.html?id=${p.id}" class="masonry-card">
        <img src="${imgUrlSmart(p.seed, 400, h)}" alt="${p.title}" loading="lazy" />
        <div class="masonry-body">
          <span class="card-tag">${p.tag}</span>
          <h3>"${p.title}"</h3>
          <p>${lines}</p>
          <div class="masonry-meta">${buildMeta(p.id)}</div>
        </div>
      </a>`;
  }).join("");

  const btn = document.getElementById("loadMoreBtn");
  if (btn) btn.style.display = getFiltered().length <= visibleCount ? "none" : "inline-block";
}

function sortPoems(val) {
  currentSort = val;
  visibleCount = 12;
  renderGallery();
}

function loadMore() {
  visibleCount += 8;
  renderGallery();
}

// Filter tabs
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.filter;
    visibleCount = 12;
    renderGallery();
  });
});

renderGallery();
