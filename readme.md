# Vila Permai

Website statis untuk melihat pilihan vila di kawasan Puncak Bogor dan mengisi simulasi pemesanan.

## Fitur

- Daftar vila dengan fasilitas, harga per malam, kapasitas, dan status ketersediaan.
- Pencarian vila berdasarkan nama, tipe, lokasi, atau fasilitas.
- Form pemesanan dengan validasi data dan pengecekan ketersediaan.
- Perhitungan estimasi harga berdasarkan vila dan lama menginap.
- Penyimpanan data pesanan di `localStorage` browser.
- Tampilan responsif untuk desktop, tablet, dan ponsel.

## Menjalankan

Tidak diperlukan instalasi dependensi atau proses build.

1. Buka `index.html` langsung di browser, atau jalankan folder ini menggunakan ekstensi seperti Live Server.
2. Pilih vila, isi tanggal check-in/check-out dan jumlah tamu untuk melihat estimasi biaya.
3. Gunakan tombol **Cek Ketersediaan** atau **Pesan Sekarang** untuk mencoba alur pemesanan.

## Struktur berkas

- `index.html` — struktur halaman dan formulir.
- `style.css` — gaya, tema, dan tata letak responsif.
- `script.js` — data vila, pencarian, validasi, dan logika pemesanan.

## Mengubah data vila

Data vila berada pada array `daftarVila` di bagian awal `script.js`. Perbarui nama, tipe, lokasi, harga, fasilitas, kapasitas, atau status ketersediaan di sana.

## Catatan

Ini adalah demo front-end tanpa backend. Pesanan disimpan hanya di `localStorage` pada browser yang digunakan dan tidak dikirim ke layanan pemesanan atau pemilik vila.
