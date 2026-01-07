(() => {
  // Ambil elemen penting
  const carousel = document.getElementById('carousel');
  const cards = Array.from(carousel.querySelectorAll('.card'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  const notifBtn = document.getElementById('notifBtn');
  const notifBadge = document.getElementById('notifBadge');
  const guideLink = document.getElementById('guideLink');
  const bottomNav = document.querySelector('.bottom-nav');

  // ===== Carousel Logic =====
  let idx = 0;
  function showIndex(i) {
    if (i < 0) i = cards.length - 1;
    if (i >= cards.length) i = 0;
    idx = i;
    carousel.scrollTo({ left: idx * carousel.offsetWidth, behavior: "smooth" });
    dots.forEach((d, k) => d.classList.toggle("active", k === idx));
  }

  dots.forEach((d) =>
    d.addEventListener("click", (e) => showIndex(Number(e.target.dataset.index)))
  );

  setInterval(() => showIndex(idx + 1), 4000);

  carousel.addEventListener("scroll", () => {
    const newIndex = Math.round(carousel.scrollLeft / carousel.offsetWidth);
    if (newIndex !== idx) {
      idx = newIndex;
      dots.forEach((d, k) => d.classList.toggle("active", k === idx));
    }
  });

  // ===== Notification Bell =====
  let notifCount = 1;
  notifBadge.hidden = notifCount === 0;
  notifBtn.addEventListener('click', () => {
    alert('Notifikasi:\n- Ada 1 pemberitahuan penting.');
    notifCount = 0; notifBadge.hidden = true;
  });

  // ===== Guide Link =====
  guideLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Menampilkan panduan penggunaan.');
  });

  // ===== Bottom Nav =====
  bottomNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-btn');
    if (!btn) return;
    document.querySelectorAll('.nav-btn').forEach(nb => nb.classList.remove('active'));
    btn.classList.add('active');
  });

  // ======== LOAD DATA PENGGUNA DARI localStorage ========
  const userNameEl = document.getElementById('userName');
  const userSubEl = document.querySelector('.user-sub');

  const savedData = localStorage.getItem('userData');
  if (savedData) {
    try {
      const { nama, provinsi, wilayah } = JSON.parse(savedData);
      userNameEl.textContent = nama || 'Pengguna';
      userSubEl.textContent = wilayah || provinsi || '-';
    } catch (err) {
      console.error('Gagal parsing userData:', err);
      userNameEl.textContent = 'Pengguna';
      userSubEl.textContent = '-';
    }
  } else {
    userNameEl.textContent = 'Pengguna';
    userSubEl.textContent = '-';
  }
})();
