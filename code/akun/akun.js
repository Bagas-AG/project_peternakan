// akun.js
(() => {
  // DOM
  const displayName = document.getElementById('displayName');
  const displayPhone = document.getElementById('displayPhone');
  const inboxBtn = document.getElementById('inboxBtn');
  const inboxBadge = document.getElementById('inboxBadge');

  // profile modal
  const modalProfile = document.getElementById('modalProfile');
  const closeProfile = document.getElementById('closeProfile');
  const formProfile = document.getElementById('formProfile');
  const inputName = document.getElementById('inputName');
  const inputPhone = document.getElementById('inputPhone');
  const cancelProfile = document.getElementById('cancelProfile');

  // change password modal
  const modalPass = document.getElementById('modalPass');
  const closePass = document.getElementById('closePass');
  const formPass = document.getElementById('formPass');
  const cancelPass = document.getElementById('cancelPass');

  // info modal
  const modalInfo = document.getElementById('modalInfo');
  const closeInfo = document.getElementById('closeInfo');
  const okInfo = document.getElementById('okInfo');
  const infoTitle = document.getElementById('infoTitle');
  const infoBody = document.getElementById('infoBody');

  // buttons
  const btnEditProfile = document.getElementById('btnEditProfile');
  const btnChangePassword = document.getElementById('btnChangePassword');
  const btnKodeKandang = document.getElementById('btnKodeKandang');
  const btnPoint = document.getElementById('btnPoint');
  const btnPersonel = document.getElementById('btnPersonel');
  const btnSapro = document.getElementById('btnSapro');
  const btnStandarisasi = document.getElementById('btnStandarisasi');

  // helpers for storage
  const USER_KEY = 'farm_user_v1';
  function loadUser(){
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return { name: 'Bagas', phone: '0838-1105-5577', inbox: 1, points: 120 };
    try { return JSON.parse(raw); } catch { return { name: 'Bagas', phone: '0838-1105-5577', inbox:1, points:120 }; }
  }
  function saveUser(u){ localStorage.setItem(USER_KEY, JSON.stringify(u)); }

  let user = loadUser();
  function refreshUI(){
    displayName.textContent = user.name || 'User';
    displayPhone.textContent = user.phone || '-';
    if (user.inbox && user.inbox > 0) {
      inboxBadge.hidden = false; inboxBadge.textContent = user.inbox;
    } else {
      inboxBadge.hidden = true;
    }
  }

  // init UI
  refreshUI();

  // inbox click: show messages (simulasi)
  inboxBtn.addEventListener('click', () => {
    showInfo('Inbox', 'Anda memiliki ' + (user.inbox||0) + ' pesan. (Simulasi)');
    // clear badge
    user.inbox = 0; saveUser(user); refreshUI();
  });

  // open/close modals helpers
  function openModal(el){
    el.classList.remove('hidden');
  }
  function closeModal(el){
    el.classList.add('hidden');
  }

  // Edit profile
  btnEditProfile.addEventListener('click', () => {
    inputName.value = user.name || '';
    inputPhone.value = user.phone || '';
    openModal(modalProfile);
  });
  closeProfile.addEventListener('click', ()=> closeModal(modalProfile));
  cancelProfile.addEventListener('click', ()=> closeModal(modalProfile));
  formProfile.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = inputName.value.trim();
    const p = inputPhone.value.trim();
    if (!n || !p) { alert('Nama dan nomor harus diisi'); return; }
    user.name = n; user.phone = p; saveUser(user); refreshUI();
    closeModal(modalProfile);
    showInfo('Sukses', 'Profil tersimpan.');
  });

  // Change password (simulasi)
  btnChangePassword.addEventListener('click', () => openModal(modalPass));
  closePass.addEventListener('click', ()=> closeModal(modalPass));
  cancelPass.addEventListener('click', ()=> closeModal(modalPass));
  formPass.addEventListener('submit', (e) => {
    e.preventDefault();
    const oldp = document.getElementById('oldPass').value;
    const newp = document.getElementById('newPass').value;
    const conf = document.getElementById('confPass').value;
    // simple validation: new password min 6 chars and match confirm
    if (newp.length < 6) { alert('Kata sandi minimal 6 karakter'); return; }
    if (newp !== conf) { alert('Konfirmasi kata sandi tidak cocok'); return; }
    // in real app -> verify old password via server
    closeModal(modalPass);
    showInfo('Sukses', 'Kata sandi berhasil diubah (simulasi).');
    formPass.reset();
  });

  // Kode Kandang
  btnKodeKandang.addEventListener('click', () => {
    const kode = prompt('Masukkan kode kandang:');
    if (!kode) return;
    // simulasikan verifikasi kode (contoh: kode = "KDG123" valid)
    if (kode.trim().toUpperCase() === 'KDG123') {
      showInfo('Berhasil', 'Kode valid. Anda sekarang memiliki akses ke kandang KDG123.');
    } else {
      showInfo('Gagal', 'Kode tidak valid atau sudah kadaluwarsa.');
    }
  });

  // Point reward
  btnPoint.addEventListener('click', () => {
    showInfo('Point Reward', `Poin Anda: <strong>${user.points||0}</strong><br>Kumpulkan poin dengan aktif menggunakan aplikasi.`);
  });

  // Pengaturan items (simulasi)
  btnPersonel?.addEventListener('click', ()=> showInfo('Atur Personel', 'Fitur Atur Personel (VIP).'));
  btnSapro?.addEventListener('click', ()=> showInfo('Pengajuan Sapronak', 'Form pengajuan jenis sapronak akan dibuka (simulasi).'));
  btnStandarisasi?.addEventListener('click', ()=> showInfo('Standarisasi', 'Standarisasi Data Harian (fitur VIP).'));

  // info modal helpers
  function showInfo(title, html){
    infoTitle.textContent = title;
    infoBody.innerHTML = html;
    openModal(modalInfo);
  }
  closeInfo.addEventListener('click', ()=> closeModal(modalInfo));
  okInfo.addEventListener('click', ()=> closeModal(modalInfo));

  // close modal by clicking outside (for all modals)
  [modalProfile, modalPass, modalInfo].forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) closeModal(m);
    });
  });

})();
