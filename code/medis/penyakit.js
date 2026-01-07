// penyakit.js
(() => {
  const gridWrap = document.getElementById('gridWrap');
  const searchInput = document.getElementById('searchInput');
  const searchToggle = document.getElementById('searchToggle');

  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');

  // daftar penyakit (nama + ikon + deskripsi singkat)
  // tambahan atau ubah sesuai kebutuhan
  const diseases = [
    { id:'cacar', label:'Cacar', ico:'🐔', desc:'Infeksi virus yang menyebabkan ruam dan menurunnya kesehatan ayam.' },
    { id:'ecoli', label:'E.Coli', ico:'🦠', desc:'Infeksi bakteri E. coli yang dapat menyebabkan diare dan kematian.' },
    { id:'kolera', label:'Kolera', ico:'💩', desc:'Gangguan pencernaan akut pada unggas, berhubungan dengan kontaminasi.' },
    { id:'snot', label:'Snot', ico:'🤧', desc:'Radang saluran pernapasan atas (snot) pada unggas.' },
    { id:'gumboro', label:'Gumboro', ico:'🟢', desc:'Penyakit Gumboro menyerang sistem kekebalan pada ayam muda.' },
    { id:'berakdarah', label:'Berak Darah', ico:'🩸', desc:'Tanda-tanda gangguan pencernaan serius pada unggas.' },
    { id:'fluburung', label:'Flu Burung', ico:'🤒', desc:'Virus influenza unggas dengan gejala pernapasan dan penurunan produksi.' },
    { id:'cacingan', label:'Cacingan', ico:'🐛', desc:'Infestasi cacing di saluran pencernaan yang mengganggu penyerapan nutrisi.' },
    { id:'marek', label:'Marek', ico:'🦴', desc:'Penyakit virus kronis yang menyerang syaraf dan sistem kekebalan.' },
    { id:'berakkapur', label:'Berak Kapur', ico:'⚪', desc:'Tanda gangguan pencernaan dengan feses berwarna pucat.' },
    { id:'tetelo', label:'Tetelo/ND', ico:'⚠️', desc:'Newcastle Disease / ND, penyakit pernapasan serius.' },
    { id:'heat', label:'Heat Stress', ico:'🌡️', desc:'Stres panas yang mempengaruhi performa dan kesehatan unggas.' },
    { id:'malaria', label:'Malaria', ico:'🦟', desc:'Infeksi parasit yang dapat menyerang unggas.' },
    { id:'kerdil', label:'Kerdil', ico:'🪶', desc:'Gangguan perkembangan (stunting) pada anak unggas.' },
    { id:'busung', label:'Busung', ico:'🍗', desc:'Kondisi kurang gizi atau distensi pencernaan.' },
    { id:'hepatitis', label:'Hepatitis', ico:'🧫', desc:'Peradangan hati yang mempengaruhi metabolisme.' },
    { id:'ne', label:'NE/Enteritis', ico:'🧻', desc:'Enteritis nekrotik pada ayam, disebabkan bakteri Clostridium.' },
    { id:'candidiasis', label:'Candidiasis', ico:'🍞', desc:'Infeksi jamur Candida pada saluran pencernaan.' },
    { id:'mikotoksik', label:'Mikotoksik', ico:'🧪', desc:'Keracunan oleh mikotoksin dalam pakan.' },
    { id:'omphalitis', label:'Omphalitis', ico:'🥚', desc:'Infeksi pada area umbilikus pada anak ayam baru menetas.' },
    { id:'ilt', label:'ILT', ico:'🐓', desc:'Infectious laryngotracheitis; penyakit pernapasan.' },
    { id:'crd', label:'CRD', ico:'😷', desc:'Chronic Respiratory Disease; penyakit pernapasan kronis.' },
    { id:'ae', label:'AE', ico:'🥚', desc:'Aspergillosis / AE; infeksi jamur pada saluran pernapasan.' },
    { id:'ib', label:'IB', ico:'🐥', desc:'Infectious Bronchitis; penyakit saluran pernapasan yang menular.' }
  ];

  // render awal
  function render(list) {
    gridWrap.innerHTML = '';
    if (!list.length) {
      gridWrap.innerHTML = '<div style="padding:20px;color:#666">Tidak ada hasil.</div>';
      return;
    }
    for (const d of list) {
      const b = document.createElement('button');
      b.className = 'item';
      b.dataset.id = d.id;
      b.innerHTML = `<div class="ico" aria-hidden="true">${d.ico}</div><div class="label">${d.label}</div>`;
      b.addEventListener('click', () => openDetail(d));
      gridWrap.appendChild(b);
    }
  }

  function openDetail(d){
    modalTitle.textContent = d.label;
    modalDesc.textContent = d.desc;
    modal.classList.remove('hidden');
  }

  function closeDetail(){
    modal.classList.add('hidden');
  }

  // search
  function doSearch(){
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { render(diseases); return; }
    const filtered = diseases.filter(x => x.label.toLowerCase().includes(q));
    render(filtered);
  }

  // events
  searchInput.addEventListener('input', doSearch);
  searchToggle?.addEventListener('click', () => searchInput.focus());
  closeModal.addEventListener('click', closeDetail);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeDetail();
  });

  // init
  render(diseases);

})();
