# Konfigurasi dan publikasi

Dokumen ini menjelaskan cara menghubungkan IDEA SPACE ke Supabase dan menerbitkannya melalui GitHub Pages. Kerjakan langkah-langkah berikut secara berurutan.

## 1. Siapkan Supabase

1. Buat proyek di [Supabase](https://supabase.com/).
2. Setelah proyek siap, buka **SQL Editor**.
3. Buat query baru, salin seluruh isi `supabase/schema.sql`, lalu jalankan.
4. Buka **Table Editor** dan pastikan tabel `public.ideas` sudah tersedia.

Skema dan kebijakan akses perlu memastikan bahwa pengunjung anonim hanya dapat mengirim ide baru dengan status `pending` dan hanya membaca ide berstatus `approved`. Pengunjung tidak boleh memperoleh izin publik untuk mengubah status atau menghapus kiriman.

## 2. Atur koneksi frontend

1. Dari pengaturan proyek Supabase, buka bagian API.
2. Salin **Project URL** dan **publishable key**. Pada proyek lama, `anon` key publik dapat digunakan.
3. Buka `assets/config.js` dan isi nilai konfigurasi sesuai format yang sudah ada di file tersebut.
4. Simpan perubahan.

Gunakan hanya publishable/anon key di frontend. Jangan gunakan `service_role` key atau secret key di `config.js`, HTML, JavaScript, maupun file lain yang dipublikasikan.

## 3. Publikasikan melalui GitHub Pages

1. Pastikan `index.html` berada di root repository.
2. Pastikan folder `assets/` dan `supabase/` ikut berada di root dengan struktur yang benar.
3. Push atau unggah perubahan ke branch `main`.
4. Di GitHub, buka **Settings → Pages**.
5. Pada bagian build and deployment, pilih **Deploy from a branch**, lalu pilih branch `main` dan folder `/(root)`.
6. Simpan pengaturan dan tunggu proses deployment selesai.
7. Buka URL GitHub Pages yang diberikan oleh repository.

Jangan unggah file ZIP sebagai pengganti isi proyek. Ekstrak paket terlebih dahulu agar `index.html` dan folder aset berada pada lokasi yang diharapkan.

## 4. Uji alur kiriman

Lakukan pengujian dari URL publik:

1. Kirim satu ide percobaan dengan judul yang mudah dikenali.
2. Buka Supabase → **Table Editor → ideas**.
3. Pastikan data masuk dan statusnya `pending`.
4. Pastikan ide pending belum muncul di Idea Wall.
5. Setelah meninjau isi kiriman, ubah status menjadi `approved`.
6. Muat ulang website dan pastikan ide tampil di Idea Wall.
7. Uji satu kiriman dengan status `rejected` dan pastikan kiriman tersebut tidak tampil.

Pengelolaan status dilakukan melalui dashboard Supabase. Jangan membuat tombol moderasi di halaman publik tanpa sistem autentikasi dan otorisasi khusus.

## 5. Pemeriksaan sebelum situs dibagikan

- Pastikan Row Level Security aktif pada tabel `public.ideas`.
- Pastikan policy `SELECT` hanya mengizinkan ide berstatus `approved`.
- Pastikan policy `INSERT` hanya menerima kiriman baru berstatus `pending`.
- Pastikan tidak ada policy publik yang memberi akses `UPDATE` atau `DELETE`.
- Pastikan tidak ada secret key di repository.
- Periksa tampilan pada ponsel dan desktop.
- Uji pengiriman, moderasi, filter kategori, dan keadaan Idea Wall saat kosong.
- Siapkan prosedur untuk meninjau spam atau kiriman yang memuat informasi pribadi.

Honeypot pada formulir hanya membantu menyaring sebagian bot. Sebelum situs dipromosikan ke audiens luas, pertimbangkan CAPTCHA atau proteksi anti-bot dan pembatasan laju pengiriman. Periksa juga kuota dan ketentuan Supabase yang berlaku untuk proyek Anda.

## Pemecahan masalah

**Formulir menyatakan konfigurasi Supabase belum tersedia**
- Periksa `assets/config.js`.
- Pastikan URL proyek dan publishable/anon key benar.
- Pastikan file konfigurasi berhasil dipublikasikan ke GitHub Pages.

**Kiriman gagal disimpan**
- Pastikan `supabase/schema.sql` sudah dijalankan.
- Periksa kebijakan RLS untuk operasi `INSERT`.
- Pastikan kiriman publik hanya dapat dibuat dengan status `pending`.

**Idea Wall kosong**
- Periksa apakah sudah ada kiriman dengan status `approved`.
- Kiriman `pending` dan `rejected` memang tidak ditampilkan.
- Periksa Console browser jika ada kesalahan JavaScript atau permintaan Supabase.

**Ide berstatus `approved` tidak tampil**
- Pastikan perubahan status sudah tersimpan.
- Muat ulang halaman.
- Periksa permintaan baca ke Supabase dan policy `SELECT` jika masalah berlanjut.
