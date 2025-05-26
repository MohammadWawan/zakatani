1. git clone : https://github.com/MohammadWawan/zakatani.git
2. jalan kan pada terminal : npm install
3. copas file credentials copy.txt dan ganti menjadi credentials.json
4. entry data sesuai form di credentials.json, namun sebelumnya buat GOOGLE SHEETS API pada 👉 https://console.cloud.google.com
5. buat gsheet dan tambahkan email dari service account (bisa kamu lihat di file credentials.json, field client_email, contoh: 
   zakat-bot@yourproject.iam.gserviceaccount.com) . Beri akses sebagai Editor dan Klik Kirim
6. siapkan akun whatsapp sebagai host
7. open terminal atau tekan CTRL + Shift + ` kemudian jalankan system pada vscode dengan perintah 👉 node index.js 
8.  scan qr code dengan wa
9.  pada akun wa lain, kirim pesan ke nomor host. isi pesan : lapor zakat
10.  entry data zakat sesuai perinta chat bot

note*: pastikan sudah install node.js versi > 20 pada server
