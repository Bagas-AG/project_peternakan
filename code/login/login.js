// login.js (OTP full client-side)
(() => {
  const phoneInput = document.getElementById('phone');
  const loginBtn = document.getElementById('loginBtn');
  const backBtn = document.getElementById('backBtn');

  backBtn.addEventListener('click', () => {
    window.location.href = '../awal/awal.html';
  });

  function normalizeNumber(v) {
    return v.replace(/[^0-9+]/g, '');
  }

  phoneInput.addEventListener('input', () => {
    phoneInput.value = normalizeNumber(phoneInput.value);
  });

  // 🔹 fungsi generate OTP acak 6 digit
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  loginBtn.addEventListener('click', () => {
    const val = phoneInput.value.trim();
    const digits = val.replace(/[^0-9]/g, '');

    if (!digits) {
      alert('Masukkan nomor handphone.');
      phoneInput.focus();
      return;
    }

    if (digits.length < 9) {
      alert('Nomor terlalu pendek. Minimal 9 digit.');
      phoneInput.focus();
      return;
    }

    // 🔹 generate OTP
    const otp = generateOTP();

    // 🔹 simpan ke localStorage
    localStorage.setItem('phone', val);
    localStorage.setItem('otp', otp);
    localStorage.setItem('otp_time', Date.now()); // opsional (expired)

    // 🔹 simulasi kirim OTP
    alert(`SIMULASI OTP Anda: ${otp}`);
    console.log('OTP:', otp);

    // 🔹 pindah ke halaman OTP
    window.location.href = 'otp.html';
  });
})();
