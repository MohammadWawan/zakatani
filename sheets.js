const { google } = require("googleapis");
const path = require("path");

async function appendZakatToSheet(data) {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1BoJfMcp-3QgdyJUNDckw6zXdlHmKGea7h7GQiglykAk";

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "zakat 2025!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString(),
            data.nama,
            data.tanaman,
            data.panen,
            data.irigasi,
            data.biaya,
            data.harga,
            data.zakatKg,
            data.zakatRp,
            data.nomorHP,
          ],
        ],
      },
    });
    console.log("✅ Data berhasil ditulis ke Google Sheets");
  } catch (error) {
    console.error("❌ Gagal menulis ke Google Sheets:", error.message);
  }
}

module.exports = { appendZakatToSheet };
