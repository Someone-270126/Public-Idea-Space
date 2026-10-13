# Setup dan publikasi IDEA SPACE

Panduan ini menghubungkan frontend GitHub Pages ke Supabase Free. Nama menu di dashboard dapat berubah sedikit.

## 1. Buat proyek Supabase
1. Buka https://supabase.com/ dan buat akun/proyek baru.
2. Pilih organisasi, nama proyek (misalnya `idea-space`), password database yang kuat, dan region yang dekat dengan audiens.
3. Tunggu proyek selesai dibuat.

## 2. Buat tabel dan aturan keamanan
1. Buka proyek Supabase → **SQL Editor** → **New query**.
2. Buka file `supabase/schema.sql` dari paket ini, salin seluruh isinya ke SQL Editor, lalu jalankan.
3. Di **Table Editor**, pastikan tabel `ideas` terbentuk.
4. Kebijakan yang dibuat:
   - pengunjung anonim hanya bisa membaca baris berstatus `approved`;
   - pengunjung bisa mengirim baris baru hanya jika statusnya `pending`;
   - tidak ada izin publik untuk mengubah status atau menghapus ide.
5. Jangan pernah memasukkan service-role/secret key ke frontend atau GitHub.

## 3. Hubungkan website ke Supabase
1. Buka **Project Settings → API** (atau bagian API Keys).
2. Salin **Project URL**.
3. Salin **publishable key**. Pada proyek lama, gunakan `anon` public key. Jangan gunakan `service_role` atau secret key.
4. Edit `assets/config.js`:
   ```js
   window.IDEA_SPACE_CONFIG = {
     SUPABASE_URL: "https://PROJECT_REF.supabase.co",
     SUPABASE_PUBLISHABLE_KEY: "sb_publishable_..."
   };
   ```
5. Simpan file. Publishable/anon key memang digunakan oleh browser; keamanan data bergantung pada Row Level Security (RLS), bukan menyembunyikan key.

## 4. Uji lokal
Buka `index.html` di browser untuk pratinjau tampilan. Untuk pengujian penuh, lebih baik gunakan local static server atau langsung deploy ke GitHub Pages karena beberapa browser membatasi file lokal. Kirim satu ide uji dan pastikan pesan menyatakan kiriman menunggu peninjauan. Ide pending tidak boleh terlihat di Idea Wall.

## 5. Moderasi kiriman
1. Buka Supabase → **Table Editor → ideas**.
2. Lihat kiriman dengan `status = pending`.
3. Tinjau konten. Untuk menyetujui, ubah status menjadi `approved`; untuk menolak, ubah menjadi `rejected`.
4. Hanya kiriman approved akan tampil. Moderasi dilakukan melalui dashboard admin Supabase, bukan halaman publik.

## 6. Deploy ke GitHub Pages
1. Buat repository baru di https://github.com/new (misalnya `idea-space`).
2. Upload semua file dan folder dari paket ini ke root repository. Jangan upload folder zip-nya sebagai satu file; ekstrak dahulu.
3. Di repository, buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main`, folder `/(root)`, lalu **Save**.
6. Tunggu GitHub Pages menerbitkan situs. URL biasanya `https://USERNAME.github.io/idea-space/`.
7. Buka URL itu, uji pengiriman, dan pastikan kiriman hanya muncul setelah status disetujui.

## 7. Pemeriksaan keamanan sebelum dibagikan
- Pastikan RLS aktif dan kedua policy pada `supabase/schema.sql` benar.
- Jangan membuat policy publik untuk `UPDATE`, `DELETE`, atau membaca semua baris.
- Jangan menaruh key admin/secret di file apa pun di repository.
- Pertimbangkan CAPTCHA/anti-bot dan pembatasan laju sebelum promosi besar. Honeypot sederhana di form bukan perlindungan kuat.
- Hindari meminta email, nomor telepon, atau data pribadi yang tidak diperlukan.
- Sediakan proses untuk menghapus konten yang mengandung data pribadi atau spam.
- Supabase Free memiliki kuota dan ketentuan yang bisa berubah; cek halaman pricing resmi sebelum dipakai luas.

## Troubleshooting
- **"Hubungkan Supabase"**: `assets/config.js` belum diisi, atau URL/key salah.
- **Form gagal**: pastikan SQL dijalankan, key benar, dan policy `INSERT` memberi `anon` akses hanya untuk `status = pending`.
- **Idea Wall kosong**: itu normal sebelum ada kiriman yang disetujui.
- **Kiriman pending terlihat publik**: hentikan publikasi sementara dan periksa policy SELECT. Policy harus `using (status = 'approved')`.
