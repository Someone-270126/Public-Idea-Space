# IDEA SPACE

Website publik futuristik untuk berbagi ide, masukan, dan inspirasi. Pengunjung tidak perlu akun. Kiriman masuk dengan status `pending`; hanya ide `approved` yang ditampilkan di Idea Wall.

## Isi paket
- `index.html` — halaman publik
- `assets/style.css` — desain responsif futuristik
- `assets/app.js` — kirim dan tampilkan ide menggunakan Supabase
- `assets/config.js` — konfigurasi URL dan publishable key
- `supabase/schema.sql` — tabel, batas data, dan Row Level Security
- `SETUP.md` — panduan setup dan publikasi

## Sebelum dipublikasikan
Website bisa dilihat sebagai pratinjau, tetapi formulir dan daftar publik baru aktif setelah proyek Supabase dibuat, SQL dijalankan, dan `assets/config.js` diisi. Ikuti `SETUP.md`.

**Penting:** hanya masukkan Supabase Project URL dan publishable/anon key di frontend. Jangan pernah masukkan `service_role` atau secret key ke repository publik.
