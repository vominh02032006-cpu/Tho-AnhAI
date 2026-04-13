// ===== GUIDE PAGE — Video Controls =====

// Setup progress bar cho mỗi video
['vid1', 'vid2', 'vid3'].forEach((id, i) => {
  const vid = document.getElementById(id);
  const n = i + 1;
  if (!vid) return;

  vid.addEventListener('timeupdate', () => {
    if (!vid.duration) return;
    const pct = (vid.currentTime / vid.duration) * 100;
    const bar = document.getElementById(`bar${n}`);
    const time = document.getElementById(`time${n}`);
    if (bar) bar.style.width = pct + '%';
    if (time) time.textContent = formatTime(vid.currentTime);
  });

  vid.addEventListener('ended', () => {
    const overlay = document.getElementById(`overlay${n}`);
    const icon = document.getElementById(`playIcon${n}`);
    if (overlay) overlay.classList.remove('hidden');
    if (icon) icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
  });
});

function playVideo(vidId, overlayId) {
  const vid = document.getElementById(vidId);
  const overlay = document.getElementById(overlayId);
  if (!vid) return;
  vid.play();
  if (overlay) overlay.classList.add('hidden');
  // Cập nhật icon
  const n = vidId.replace('vid', '');
  const icon = document.getElementById(`playIcon${n}`);
  if (icon) icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
}

function togglePlay(vidId, overlayId) {
  const vid = document.getElementById(vidId);
  const overlay = document.getElementById(overlayId);
  const n = vidId.replace('vid', '');
  const icon = document.getElementById(`playIcon${n}`);
  if (!vid) return;

  if (vid.paused) {
    vid.play();
    if (overlay) overlay.classList.add('hidden');
    if (icon) icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
  } else {
    vid.pause();
    if (icon) icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
  }
}

function toggleMute(vidId, iconId) {
  const vid = document.getElementById(vidId);
  const icon = document.getElementById(iconId);
  if (!vid) return;
  vid.muted = !vid.muted;
  if (icon) {
    icon.innerHTML = vid.muted
      ? '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>'
      : '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>';
  }
}

function seekVideo(e, vidId) {
  const vid = document.getElementById(vidId);
  const n = vidId.replace('vid', '');
  const prog = document.getElementById(`prog${n}`);
  if (!vid || !prog || !vid.duration) return;
  const rect = prog.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  vid.currentTime = pct * vid.duration;
}

function toggleFullscreen(vidId) {
  const vid = document.getElementById(vidId);
  if (!vid) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    vid.requestFullscreen && vid.requestFullscreen();
  }
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}
