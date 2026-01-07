// otp.js
(() => {
  const otpInput = document.getElementById('otp');
  const verifyBtn = document.getElementById('verifyBtn');

  verifyBtn.addEventListener('click', () => {
    const inputOtp = otpInput.value.trim();
    const savedOtp = localStorage.getItem('otp');
    const otpTime = localStorage.getItem('otp_time');

    if (!inputOtp) {
      alert('Masukkan kode OTP');
      return;
    }

    // 🔹 optional: expired 5 menit
    const EXPIRE_TIME = 5 * 60 * 1000;
    if (Date.now() - otpTime > EXPIRE_TIME) {
      alert('OTP sudah kedaluwarsa');
      localStorage.removeItem('otp');
      return;
    }

    if (inputOtp === savedOtp) {
      alert('Login berhasil ✅');

      // 🔹 bersihkan OTP
      localStorage.removeItem('otp');
      localStorage.removeItem('otp_time');

      // redirect ke dashboard
      window.location.href = '../datadiri/datadiri.html';
    } else {
      alert('Kode OTP salah ❌');
    }
  });
})();
