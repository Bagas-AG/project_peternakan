const phValue = document.getElementById('phValue');
const phStatus = document.getElementById('phStatus');
const ayamValue = document.getElementById('ayamValue');

// SIMULASI DATA SENSOR
function updateData() {
  const ph = (Math.random() * (8 - 5) + 5).toFixed(2); // pH 5 - 8
  const ayam = Math.floor(Math.random() * 5000) + 1000;

  phValue.textContent = ph;
  ayamValue.textContent = ayam;

  if (ph >= 6.5 && ph <= 7.5) {
    phStatus.textContent = 'Status: Normal ✅';
    phStatus.style.color = '#27ae60';
  } else {
    phStatus.textContent = 'Status: Tidak Normal ⚠';
    phStatus.style.color = '#e74c3c';
  }
}
