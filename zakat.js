function hitungZakat({
  hasilPanenKg,
  jenisIrigasi,
  biayaOperasional,
  hargaPerKg,
}) {
  const labaKotor = hasilPanenKg * hargaPerKg;
  const batasBiaya = 0.33 * labaKotor;
  const biayaValid = Math.min(biayaOperasional, batasBiaya);
  const labaBersih = labaKotor - biayaValid;

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

  const zakatRp = labaBersih * persenZakat;
  const zakatKg = zakatRp / hargaPerKg;

  return {
    zakatKg: zakatKg.toFixed(2),
    zakatRp: zakatRp.toFixed(0),
  };
}

module.exports = { hitungZakat };
