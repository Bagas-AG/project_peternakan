    // Ambil data dari sessionStorage
    const data = JSON.parse(sessionStorage.getItem("hasilSimulasi"));

    if (!data) {
      document.getElementById("output").innerHTML = "<p>⚠️ Tidak ada data simulasi ditemukan.</p>";
    } else {
      document.getElementById("output").innerHTML = `
        <div class="row"><span>🕒 Waktu Simulasi:</span> ${data.waktu}</div>
        <div class="row"><span>🐔 Populasi Awal:</span> ${data.populasi.toLocaleString()} ekor</div>
        <div class="row"><span>📆 Umur Panen:</span> ${data.umur} hari</div>
        <div class="row"><span>🥫 Total Pakan:</span> ${data.pakan.toLocaleString()} kg</div>
        <div class="row"><span>🐥 Ayam Panen:</span> ${data.ayamPanen.toLocaleString()} ekor</div>
        <div class="row"><span>⚖️ Tonase Daging:</span> ${data.tonase.toLocaleString()} kg</div>

        <hr>

        <div class="row"><span>💰 Harga DOC/kg:</span> Rp ${data.hargaDoc.toLocaleString()}</div>
        <div class="row"><span>🌾 Harga Pakan/kg:</span> Rp ${data.hargaPakan.toLocaleString()}</div>
        <div class="row"><span>💊 Biaya OVK/kg:</span> Rp ${data.biayaOvk.toLocaleString()}</div>
        <div class="row"><span>🏪 Harga Pasar/kg:</span> Rp ${data.hargaPasar.toLocaleString()}</div>

        <hr>

        <div class="row"><span>📦 Total Biaya Produksi:</span> <strong>Rp ${data.totalBiaya.toLocaleString()}</strong></div>
        <div class="row"><span>💵 Total Pendapatan:</span> <strong>Rp ${data.totalPendapatan.toLocaleString()}</strong></div>
        <div class="row highlight"><span>📈 Laba Bersih:</span> <strong>Rp ${data.laba.toLocaleString()}</strong></div>
        <div class="row highlight"><span>⚖️ Titik Impas (BEP):</span> <strong>Rp ${data.BEP.toLocaleString(undefined, {maximumFractionDigits: 0})} /kg</strong></div>
      `;
    }

    function hapusData() {
      sessionStorage.removeItem("hasilSimulasi");
      alert("🗑️ Data simulasi dihapus!");
      window.location.href = "sm.html";
    }