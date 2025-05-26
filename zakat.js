function hitungZakat({
  hasilPanenKg,
  jenisIrigasi,

  hargaPerKg,
}) {
  // Hitung potongan maksimal biaya operasional sebagai 1/3 dari hasil panen dalam kg
  const batasPotonganKg = hasilPanenKg * (1 / 3); // Bisa diganti jadi 1/4 jika perlu

  const irigasiBuatan = [
    "buatan",
    "irigasi buatan",
    "pompa",
    "sumur",
    "manual",
  ];
  const irigasiAlami = [
    "hujan",
    "air hujan",
    "sungai",
    "air sungai",
    "aliran",
    "alam",
  ];
  const irigasi = jenisIrigasi.toLowerCase();

  let persenZakat = 0;
  if (irigasiBuatan.some((k) => irigasi.includes(k))) {
    persenZakat = 0.05;
  } else if (irigasiAlami.some((k) => irigasi.includes(k))) {
    persenZakat = 0.1;
  } else {
    throw new Error(
      "Jenis irigasi tidak dikenali. Gunakan air hujan/sungai (alami) atau irigasi buatan/sumur."
    );
  }

  const zakatKg = (hasilPanenKg - batasPotonganKg) * persenZakat;
  const zakatRp = zakatKg * hargaPerKg;

  return {
    zakatKg: zakatKg.toFixed(2),
    zakatRp: zakatRp.toFixed(0),
  };
}

module.exports = { hitungZakat };
