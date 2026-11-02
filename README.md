# Kopi Pagi — Landing Page Kedai Kopi

Landing page statis untuk kedai kopi fiktif bernama **Kopi Pagi** di Cigadung, Bandung. Dibuat dengan HTML, CSS, dan JavaScript murni — tanpa framework, tanpa build step, tinggal buka `index.html` atau jalankan server statis.

## Isi halaman

- **Hero** — janji utama: kopi disangrai sendiri, buka pukul enam pagi.
- **Menu** — dua kolom daftar kopi dan non-kopi, dengan foto dan harga.
- **Bar / galeri** — satu bingkai bundar yang berganti foto otomatis (bisa diklik, dengan fallback aksesibilitas via tombol).
- **Proses** — tiga tahap dari karung ke cangkir (pilih, sangrai, seduh).
- **Resep seduh interaktif** — tab V60 / Aeropress / Tubruk yang menukar angka resep.
- **Kupon pesan meja** — form yang mengirim permintaan via email klien (`mailto:`).
- **Diagram alur** — file `kopi-pagi.html` (dibuat dengan [Archify](https://github.com/tt-a1i/archify)) menampilkan alur dari kebun ke cangkir.

## Struktur

```
index.html              Halaman utama
assets/
  styles.css            Semua gaya
  main.js               Interaksi: galeri, tab resep, reveal, form
  fonts/                Font Jost lokal (woff2)
  *.jpg                 Foto berlisensi terbuka (Wikimedia Commons)
.archify/               Diagram alur dan file mentahnya
```

## Menjalankan local

```bash
php -S 127.0.0.1:4173 -t .
# atau
python3 -m http.server 4173
```

## Catatan foto

Semua foto diunduh dari Wikimedia Commons dengan lisensi CC BY / CC BY-SA dan kreditnya tercantum di footer halaman. Identitas kedai, menu, harga, alamat, dan kontak bersifat fiktif.