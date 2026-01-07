document.getElementById("buatKandang").addEventListener("click", () => {
  alert("Fitur Buat Kandang belum diimplementasikan");
  // nanti bisa diarahkan ke form buat kandang
  // window.location.href = "buat-kandang.html";
});

document.getElementById("masukkanKode").addEventListener("click", () => {
  let kode = prompt("Masukkan kode kandang:");
  if (kode) {
    alert("Kode dimasukkan: " + kode);
    // TODO: Kirim kode ke server untuk verifikasi
  }
});
