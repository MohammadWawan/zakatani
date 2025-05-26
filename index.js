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

    if (
      text === "lapor zakat" ||
      text === "Lapor Zakat" ||
      text === "Lapor zakat"
    ) {
      await client.sendText(
        message.from,
        `Silakan isi data laporan berikut, dengan format:\n` +
          `\nNama, Tanaman Pertanian, Hasil Panen(Kg), Jenis irigasi, Biaya operasional(Rp), Harga jual(Kg)\n` +
          `Contoh:\nAnnisa, Jagung, 1150, hujan, 3455000, 6300 \n \n` +
          "Jenis irigasi: \n" +
          "Irigasi buatan : Sumur, Pompa, Manual \n" +
          "Irigasi alami : Hujan, sungai, aliran, alam"
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
          `- Zakat Wajib (Kg): ${hasil.zakatKg} Kg\n` +
          `- Zakat Wajib (Rp): Rp. ${hasil.zakatRp}`;

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
