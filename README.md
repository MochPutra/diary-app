# Diary App (Pertemuan 2 & 3)

- **Nama:** (isi nama)
- **NIM:** (isi NIM)
- **Mata Kuliah:** Mobile Programming - React Native + Expo CLI

## Cara Menjalankan
```bash
npm install
npx expo install react-native-safe-area-context
npx expo start        # tekan a (Android emulator), w (web), atau scan QR di Expo Go
npx expo start -c     # jika perubahan tidak terlihat (bersihkan cache)
```

## Fitur yang Diselesaikan
**Pertemuan 2**
- [x] 6 entri diary (minimal 5)
- [x] Gambar lokal pada `assets/moods` (entri 4 dan 6)
- [x] Avatar pengguna pada header (`assets/avatar.png`)
- [x] Variasi border kartu + badge berdasarkan mood
- [x] DiaryCard sebagai komponen reusable, struktur folder rapi

**Pertemuan 3**
- [x] Design tokens (`src/styles/tokens.js`) dipakai di semua komponen
- [x] FlatList responsif: 1 kolom (ponsel) dan 2 kolom (width >= 600 px)
- [x] DiaryDetailModal terbuka saat kartu ditekan, tombol Tutup berfungsi
- [x] Aksesibilitas: accessibilityLabel/Role, kontras teks, target sentuh >= 44dp
- [x] 6 entri (minimal 2 entri baru dari modul)

## Screenshot
- Tampilan 1 kolom: `screenshots/1-kolom.png`
- Tampilan 2 kolom: `screenshots/2-kolom.png`

## Cara Kerja Breakpoint 600 px
Aplikasi membaca lebar layar lewat hook `useWindowDimensions()` pada
`DiaryListScreen`. Nilainya dibandingkan dengan `BREAKPOINTS.tablet` (600) di
`tokens.js`: `const twoCols = width >= BREAKPOINTS.tablet`. Bila lebar < 600 px
(ponsel portrait) `twoCols = false`, sehingga `FlatList` memakai
`numColumns={1}` dan kartu bervariant `list`. Bila lebar >= 600 px (tablet atau
ponsel landscape) `twoCols = true`, sehingga `numColumns={2}`, jarak antar
kolom diatur `columnWrapperStyle`, dan tiap item memakai `flex: 1/2` agar
lebarnya setengah baris. Karena `useWindowDimensions` memicu render ulang saat
ukuran atau orientasi berubah, layout beradaptasi otomatis. Prop `key` pada
`FlatList` diganti (`list1` / `grid2`) karena React Native tidak mengizinkan
`numColumns` berubah tanpa membuat ulang list.
