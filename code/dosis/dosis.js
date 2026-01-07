function hitungDosis() {
  const populasi = Number(document.getElementById("populasi").value);
  const bobot = Number(document.getElementById("bobot").value);
  const air = Number(document.getElementById("air").value);
  const dosis = Number(document.getElementById("dosis").value);
  const kadar = Number(document.getElementById("kadar").value);

  if (!populasi || !bobot || !air || !dosis || !kadar) {
    alert("⚠️ Semua data harus diisi!");
    return;
  }

  // Total bobot ayam (kg)
  const totalBobot = populasi * bobot;

  // Total kebutuhan obat (mg)
  const totalObatMg = totalBobot * dosis;

  // Konversi ke gram obat
  const totalObatGram = totalObatMg / kadar;

  // Total air minum (liter)
  const totalAir = populasi * air;

  document.getElementById("hasil").innerHTML = `
    Total bobot ayam: <b>${totalBobot.toFixed(2)} kg</b><br>
    Total kebutuhan obat: <b>${totalObatGram.toFixed(2)} gram</b><br>
    Total air minum: <b>${totalAir.toFixed(2)} liter</b><br><br>
    👉 Campurkan <b>${totalObatGram.toFixed(2)} gram obat</b> ke dalam 
    <b>${totalAir.toFixed(2)} liter air</b>
  `;
}

function resetForm() {
  document.querySelectorAll("input").forEach(input => input.value = "");
  document.getElementById("hasil").innerText =
    "Masukkan data lalu klik \"Hitung Dosis\"";
}
