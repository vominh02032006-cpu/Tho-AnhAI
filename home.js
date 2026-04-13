// ===== HOME PAGE =====

// Featured grid — top 5 by likes
function renderFeatured() {
  const top = [...POEMS_DATA].sort((a, b) => b.likes - a.likes).slice(0, 5);
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  // Card lớn = bài đầu tiên
  const large = top[0];
  const smalls = top.slice(1, 5);

  const largeHtml = `
    <a href="poem.html?id=${large.id}" class="fh-card large">
      <img src="${imgUrlSmart(large.seed, 700, 600)}" alt="${large.title}" loading="lazy" />
      <div class="fh-info">
        <span class="fh-tag">${large.tag}</span>
        <h3>"${large.title}"</h3>
        <p>${large.poem.split("\n").slice(0, 2).join("<br />")}</p>
        <div class="fh-meta">${buildMeta(large.id)}</div>
      </div>
    </a>`;

  const smallsHtml = smalls.map(p => `
    <a href="poem.html?id=${p.id}" class="fh-card">
      <img src="${imgUrlSmart(p.seed, 400, 280)}" alt="${p.title}" loading="lazy" />
      <div class="fh-info">
        <span class="fh-tag">${p.tag}</span>
        <h3>"${p.title}"</h3>
        <div class="fh-meta">${buildMeta(p.id)}</div>
      </div>
    </a>`).join("");

  grid.innerHTML = largeHtml + smallsHtml;
}

// Latest grid — 8 bài mới nhất (theo id giảm dần)
function renderLatest() {
  const grid = document.getElementById("latestGrid");
  if (!grid) return;
  const latest = [...POEMS_DATA].sort((a, b) => b.id - a.id).slice(0, 8);
  grid.innerHTML = latest.map(p => renderCard(p, "latest-card")).join("");
}

renderFeatured();
renderLatest();
