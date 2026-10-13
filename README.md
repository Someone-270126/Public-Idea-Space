# IDEA SPACE

IDEA SPACE adalah ruang publik untuk mengumpulkan gagasan, masukan, dan usulan dari komunitas. Pengunjung dapat mengirim ide tanpa membuat akun. Setiap kiriman masuk ke antrean peninjauan; hanya kiriman yang disetujui yang ditampilkan di Idea Wall.

## Fitur

- Form pengiriman ide tanpa login.
- Kategori, judul, deskripsi, dan nama pengirim opsional.
- Idea Wall untuk menampilkan ide yang telah disetujui.
- Filter kategori pada daftar ide.
- Moderasi melalui Supabase.
- Frontend statis yang dapat dipublikasikan lewat GitHub Pages.

## Struktur proyek

```text
.
├── index.html
├── assets/
│   ├── style.css
│   ├── app.js
│   └── config.js
├── supabase/
│   └── schema.sql
├── README.md
└── SETUP.md
```

## Teknologi

- HTML, CSS, dan JavaScript
- Supabase Database dan Row Level Security (RLS)
- GitHub Pages

## Menjalankan proyek

1. Siapkan proyek Supabase dan jalankan `supabase/schema.sql`.
2. Isi URL proyek dan publishable key pada `assets/config.js`.
3. Publikasikan isi repository melalui GitHub Pages.
4. Ikuti pemeriksaan pada [`SETUP.md`](SETUP.md) sebelum membagikan situs.

## Alur publikasi ide

1. Pengunjung mengirim ide melalui formulir.
2. Data disimpan dengan status `pending`.
3. Pengelola meninjau kiriman melalui Supabase.
4. Status diubah menjadi `approved` untuk menerbitkan atau `rejected` untuk menolak.
5. Idea Wall hanya menampilkan kiriman berstatus `approved`.

## Konfigurasi dan keamanan

`SUPABASE_URL` dan publishable key memang digunakan oleh browser. Akses tetap harus dibatasi dengan kebijakan RLS yang sesuai. Jangan menaruh `service_role` key atau secret key di file frontend maupun repository publik.

Sebelum situs dipromosikan secara luas, tambahkan perlindungan terhadap spam dan bot, lalu uji kembali kebijakan akses. Honeypot sederhana pada formulir bukan pengganti pembatasan laju atau CAPTCHA.

Panduan konfigurasi dan publikasi tersedia di [`SETUP.md`](SETUP.md).
