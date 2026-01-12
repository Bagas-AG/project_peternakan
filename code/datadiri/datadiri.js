// === AMBIL ELEMEN FORM ===
const form = document.getElementById('dataForm');
const namaInput = document.getElementById('nama');
const provinsiSelect = document.getElementById('provinsi');
const kotaSelect = document.getElementById('wilayah');

// === LOAD DATA DARI JSON ===
fetch('/api/wilayah')
  .then(response => response.json())
  .then(data => {
    Object.keys(data).forEach(provinsi => {
      const option = document.createElement('option');
      option.value = provinsi;
      option.textContent = provinsi;
      provinsiSelect.appendChild(option);
    });

    provinsiSelect.addEventListener('change', () => {
      const selectedProv = provinsiSelect.value;
      kotaSelect.innerHTML = '<option value="">Pilih Kota / Kabupaten</option>';

      if (data[selectedProv]) {
        data[selectedProv].forEach(kota => {
          const option = document.createElement('option');
          option.value = kota;
          option.textContent = kota;
          kotaSelect.appendChild(option);
        });
      }
    });
  })
  .catch(err => console.error(err));

// === EVENT SUBMIT FORM ===
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nama = namaInput.value.trim();
  const provinsi = provinsiSelect.value;
  const wilayah = kotaSelect.value;

  // validasi input
  if (!nama) {
    alert('Nama tidak boleh kosong');
    return;
  }

  if (!provinsi) {
    alert('Pilih provinsi terlebih dahulu');
    return;
  }

  if (!wilayah) {
    alert('Pilih kota/kabupaten terlebih dahulu');
    return;
  }

  // simpan ke localStorage
  const userData = { nama, provinsi, wilayah };
  localStorage.setItem('userData', JSON.stringify(userData));

  // tampilkan notifikasi & redirect
  alert(
    `Data berhasil disimpan!\nNama: ${nama}\nProvinsi: ${provinsi}\nWilayah: ${wilayah}`
  );

  window.location.href = '../home/home.html';
});
