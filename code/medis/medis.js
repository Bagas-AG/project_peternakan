// medis.js (final gabungan)
// - tidak ada variabel/func ganda
// - tombol "Lainnya" akan redirect ke penyakit.html
// - modal bisa ditutup dengan tombol X atau klik di luar
// - pencarian dan rendering grid bekerja

(() => {
  // data penyakit & produsen (sesuaikan / tambah jika perlu)
  const diseases = [
    { id: 'cacar', label: 'Cacar', ico: '🐔' },
    { id: 'ecoli', label: 'E.Coli', ico: '🦠' },
    { id: 'kolera', label: 'Kolera', ico: '💩' },
    { id: 'snot', label: 'Snot', ico: '🤧' },
    { id: 'gumboro', label: 'Gumboro', ico: '🟢' },
    { id: 'berak', label: 'Berak Darah', ico: '🩸' },
    { id: 'flu', label: 'Flu Burung', ico: '🤒' },
    { id: 'lainnya', label: 'Lainnya', ico: '⋯' } // bila diklik -> redirect
  ];

  const producers = [
    { id:'medion', label:'Medion', logo:'🅼' },
    { id:'mensana', label:'Mensana', logo:'Ⓜ️' },
    { id:'pakanx', label:'PakanX', logo:'PX' }
  ];

  // DOM elements (harus sesuai medis.html)
  const diseaseGrid = document.getElementById('diseaseGrid');
  const producerGrid = document.getElementById('producerGrid');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeModalBtn = document.getElementById('closeModal');
  const locationText = document.getElementById('locationText');

  // Safety: cek keberadaan elemen penting
  if (!diseaseGrid || !producerGrid || !searchInput || !searchBtn || !modal || !closeModalBtn) {
    console.warn('medis.js: elemen penting tidak ditemukan. Periksa medis.html dan id elemen.');
    return;
  }

  // render grid (generic untuk disease/producer)
  function renderGrid(list, container, type = 'disease') {
    container.innerHTML = '';
    for (const item of list) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'item';
      btn.dataset.id = item.id;
      btn.innerHTML = `
        <div class="${type === 'disease' ? 'ico' : 'logo'}" aria-hidden="true">
          ${type === 'disease' ? item.ico : item.logo}
        </div>
        <div class="label">${item.label}</div>
      `;
      btn.addEventListener('click', () => onItemClick(item, type));
      container.appendChild(btn);
    }
  }

  // handler klik item
  function onItemClick(item, type) {
    if (type === 'disease') {
      // jika tombol 'lainnya' diklik -> pindah ke penyakit.html
      if (item.id === 'lainnya') {
        // gunakan path relatif sesuai lokasi file medis.html
        window.location.href = 'penyakit.html';
        return;
      }

      // tampilkan modal untuk penyakit lain
      modalTitle.textContent = item.label;
      modalBody.innerHTML = `
        <strong>Deskripsi singkat</strong>
        <p>Informasi tentang <strong>${item.label}</strong> pada unggas.</p>
        <p><em>Rekomendasi:</em> konsultasi ke dokter hewan / lihat artikel terkait.</p>
      `;
      openModal();
    } else if (type === 'producer') {
      // contoh tindakan: buka halaman produsen atau tampilkan info
      // window.location.href = 'produsen.html?id=' + encodeURIComponent(item.id);
      alert('Buka halaman produsen: ' + item.label);
    }
  }

  // pencarian sederhana pada label
  function doSearch() {
    const q = String(searchInput.value || '').trim().toLowerCase();
    if (!q) {
      renderGrid(diseases, diseaseGrid, 'disease');
      return;
    }
    const filtered = diseases.filter(d => d.label.toLowerCase().includes(q));
    renderGrid(filtered, diseaseGrid, 'disease');
  }

  // modal open/close helpers (menggunakan attribute hidden & class hidden)
  function openModal() {
    modal.classList.remove('hidden');
    modal.hidden = false;
  }
  function closeModal() {
    modal.classList.add('hidden');
    modal.hidden = true;
  }

  // event listener modal close button & klik overlay
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // event search
  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });

  // render producers
  function renderProducers() {
    renderGrid(producers, producerGrid, 'producer');
  }

  // geolocation (best-effort)
  function tryLocation() {
    if (!navigator.geolocation || !locationText) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude.toFixed(3);
      const lon = pos.coords.longitude.toFixed(3);
      locationText.textContent = `Lat ${lat}, Lon ${lon}`;
    }, (err) => {
      console.warn('Lokasi error', err);
    }, { timeout: 4000 });
  }

  // init
  renderGrid(diseases, diseaseGrid, 'disease');
  renderProducers();
  tryLocation();

  // OPTIONAL: jika kamu punya tombol LINK "lihat semua" atau id tertentu
  // let lainnyaBtn = document.getElementById('lainnyaBtn');
  // if (lainnyaBtn) lainnyaBtn.addEventListener('click', ()=> window.location.href = 'penyakit.html');

  // expose helper ke console (opsional)
  window._medis_openModal = openModal;
  window._medis_closeModal = closeModal;

})(); // IIFE end
