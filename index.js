const { create } = require("@wppconnect-team/wppconnect");
const { hitungZakat } = require("./zakat");
const { appendZakatToSheet } = require("./sheets");

create({
  session: "zakat-bot",
  catchQR: (qr) => console.log("QR Code:", qr),
  headless: true,
})
  .then((client) => startBot(client))
  .catch((err) => console.log(err));

function startBot(client) {
  client.onMessage(async (message) => {
    const text = message.body.toLowerCase();

    if (text === "lapor zakat") {
      await client.sendText(
        message.from,
        `Silakan isi data laporan berikut:\n` +
          `Format:\nNama, Tanaman, Panen(kg), Irigasi, Biaya(Rp), Harga(Kg)\n` +
          `Contoh:\nAhmad, Padi, 1000, air hujan, 2000000, 6000 \n \n` +
          "kategori irigasi: \n" +
          "irigasi buatan : pompa, sumur, manual \n" +
          "irigasi alami : hujan, sungai, aliran, alam"
      );
      return;
    }

    const parts = message.body.split(",");
    if (parts.length === 6) {
      const [nama, tanaman, panenStr, irigasi, biayaStr, hargaStr] = parts.map(
        (p) => p.trim()
      );

      const panen = parseFloat(panenStr);
      const biaya = parseInt(biayaStr);
      const harga = parseInt(hargaStr);

      try {
        const hasil = hitungZakat({
          hasilPanenKg: panen,
          jenisIrigasi: irigasi,
          biayaOperasional: biaya,
          hargaPerKg: harga,
        });

        const replyMsg =
          `✅ Zakat yang wajib dikeluarkan oleh *${nama}*:\n` +
          `- Zakat (Kg): ${hasil.zakatKg} Kg\n` +
          `- Zakat (Rp): Rp ${hasil.zakatRp}`;

        await appendZakatToSheet({
          nomorHP: message.from.replace(/@c\.us$/, ""),
          nama,
          tanaman,
          panen,
          irigasi,
          biaya,
          harga,
          zakatKg: hasil.zakatKg,
          zakatRp: hasil.zakatRp,
        });

        await client.sendText(message.from, replyMsg);
      } catch (err) {
        await client.sendText(
          message.from,
          `❌ Gagal hitung zakat: ${err.message}`
        );
      }
    }
  });
}
