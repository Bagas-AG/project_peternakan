function hitung() {
  alert("Data berhasil disimpan! Sekarang Anda bisa lanjut ke perhitungan.");
}

// Fungsi untuk kalkulasi dan pindah halaman hasil
async function kalkulasi() {
  const populasi = parseFloat(document.getElementById("populasi").value);
  const umur = parseFloat(document.getElementById("umur").value);
  const pakan = parseFloat(document.getElementById("pakan").value);
  const ayamPanen = parseFloat(document.getElementById("ayamPanen").value);
  const tonase = parseFloat(document.getElementById("tonase").value);
  const hargaDoc = parseFloat(document.getElementById("hargaDoc").value);
  const hargaPakan = parseFloat(document.getElementById("hargaPakan").value);
  const biayaOvk = parseFloat(document.getElementById("biayaOvk").value);
  const hargaPasar = parseFloat(document.getElementById("hargaPasar").value);

  if (
    isNaN(populasi) ||
    isNaN(umur) ||
    isNaN(pakan) ||
    isNaN(ayamPanen) ||
    isNaN(tonase) ||
    isNaN(hargaDoc) ||
    isNaN(hargaPakan) ||
    isNaN(biayaOvk) ||
    isNaN(hargaPasar)
  ) {
    alert("⚠️ Harap isi semua data terlebih dahulu!");
    return;
  }

  // ====== Perhitungan dasar ======
  const totalDoc = populasi * hargaDoc;
  const totalPakan = pakan * hargaPakan;
  const totalOvk = tonase * biayaOvk;
  const totalBiaya = totalDoc + totalPakan + totalOvk;
  const totalPendapatan = tonase * hargaPasar;
  const laba = totalPendapatan - totalBiaya;
  const BEP = totalBiaya / tonase;

  const hasil = {
    populasi,
    umur,
    pakan,
    ayamPanen,
    tonase,
    hargaDoc,
    hargaPakan,
    biayaOvk,
    hargaPasar,
    totalBiaya,
    totalPendapatan,
    laba,
    BEP,
  };

  // Simpan ke sessionStorage untuk halaman hasil
  sessionStorage.setItem("hasilSimulasi", JSON.stringify(hasil));

  // Kirim ke server.js agar disimpan ke ds.json
  try {
    const response = await fetch("http://localhost:3000/api/simulasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hasil),
    });

    const result = await response.json();
    if (result.success) {
      console.log("✅ Data simulasi disimpan ke ds.json:", result.data);
    } else {
      console.warn("⚠️ Gagal simpan ke server:", result.message);
    }
  } catch (err) {
    console.error("❌ Error kirim ke server:", err);
  }

  // Pindah ke halaman hasil
  // Kirim data ke server
  fetch("http://localhost:3000/api/simulasi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      populasi,
      umur,
      pakan,
      ayamPanen,
      tonase,
      hargaDoc,
      hargaPakan,
      biayaOvk,
      hargaPasar,
      totalBiaya,
      totalPendapatan,
      laba,
      BEP,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log("✅ Data terkirim:", data))
    .catch((err) => console.error("❌ Gagal kirim data:", err));

  window.location.href = "hasil.html";
}

// Fungsi reset form
function resetForm() {
  document.querySelectorAll("input").forEach((i) => (i.value = ""));
  alert("Semua input telah direset!");
}
