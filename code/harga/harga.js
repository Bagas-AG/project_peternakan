const provinsiSelect = document.getElementById('provinsi');
const kotaSelect = document.getElementById('wilayah');

const hargaLive = document.getElementById('hargaLive');
const hargaMati = document.getElementById('hargaMati');
const hargaPotongan = document.getElementById('hargaPotongan');

let wilayahData = {};
let hargaData = {};

// LOAD DATA JSON
Promise.all([
  fetch('/api/wilayah'),
  fetch('/api/harga')
])
.then(async ([wilayahRes, hargaRes]) => {
  if (!wilayahRes.ok || !hargaRes.ok) {
    throw new Error('Gagal load JSON');
  }

  wilayahData = await wilayahRes.json();
  hargaData = await hargaRes.json();

  Object.keys(wilayahData).forEach(prov => {
    const opt = document.createElement('option');
    opt.value = prov;
    opt.textContent = prov;
    provinsiSelect.appendChild(opt);
  });
})
.catch(err => {
  alert('Gagal memuat data JSON');
  console.error(err);
});


  // isi provinsi
  Object.keys(wilayahData).forEach(prov => {
    const opt = document.createElement('option');
    opt.value = prov;
    opt.textContent = prov;
    provinsiSelect.appendChild(opt);
  });
})
.catch(err => {
  alert('Gagal memuat data JSON');
  console.error(err);
});

// saat provinsi dipilih
provinsiSelect.addEventListener('change', () => {
  kotaSelect.innerHTML = '<option value="">Pilih Kota / Kabupaten</option>';
  resetHarga();

  const prov = provinsiSelect.value;
  if (!wilayahData[prov]) return;

  wilayahData[prov].forEach(kota => {
    const opt = document.createElement('option');
    opt.value = kota;
    opt.textContent = kota;
    kotaSelect.appendChild(opt);
  });
});

// saat kota dipilih
kotaSelect.addEventListener('change', () => {
  resetHarga();

  const kota = kotaSelect.value;
  if (!hargaData[kota]) {
    hargaLive.textContent = 'Ayam Hidup: Data belum tersedia';
    hargaMati.textContent = 'Ayam Mati: Data belum tersedia';
    hargaPotongan.textContent = 'Ayam Potongan: Data belum tersedia';
    return;
  }

  const data = hargaData[kota];
  hargaLive.textContent = `Ayam Hidup: Rp ${data.live.toLocaleString()} / kg`;
  hargaMati.textContent = `Ayam Mati: Rp ${data.mati.toLocaleString()} / kg`;
  hargaPotongan.textContent = `Ayam Potongan: Rp ${data.potongan.toLocaleString()} / kg`;
});

function resetHarga() {
  hargaLive.textContent = 'Ayam Hidup: -';
  hargaMati.textContent = 'Ayam Mati: -';
  hargaPotongan.textContent = 'Ayam Potongan: -';
}
