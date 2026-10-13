import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, RADIUS, BREAKPOINTS } from '../styles/tokens';

const DATA = [
  {
    id: 1, mood: 'happy',
    title: 'Pagi yang Tenang', date: '2025-10-06',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit di sekitar kompleks. Udara terasa sejuk, jalanan masih sepi, dan pikiran terasa jernih. Setelah itu aku sarapan dengan santai sebelum mulai beraktivitas.',
    moodUri: 'https://picsum.photos/seed/happy/200',
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
  },
  {
    id: 2, mood: 'focus',
    title: 'Produktif di Kampus', date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    body: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Kemajuan proyek cukup baik: struktur folder sudah rapi dan komponen DiaryCard sudah bisa dipakai ulang.',
    moodUri: 'https://picsum.photos/seed/focus/200',
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
  },
  {
    id: 3, mood: 'calm',
    title: 'Senja di Taman', date: '2025-10-04',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    body: 'Menikmati senja sambil membaca buku favorit. Warna langit berubah dari jingga ke ungu. Refleksi singkat: kadang istirahat sebentar justru membuat pekerjaan terasa lebih ringan.',
    moodUri: 'https://picsum.photos/seed/calm/200',
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
  },
  {
    // Gambar LOKAL dari assets/moods (Tugas P2)
    id: 4, mood: 'tired',
    title: 'Begadang Mengerjakan Tugas', date: '2025-10-03',
    preview: 'Deadline makin dekat, jadi semalam aku begadang menyelesaikan layout aplikasi...',
    body: 'Deadline makin dekat, jadi semalam aku begadang menyelesaikan layout aplikasi. Badan terasa lelah, tapi lega karena tampilan sudah mulai terbentuk. Besok harus tidur lebih awal.',
    moodUri: require('../../assets/moods/tired.png'),
  },
  {
    id: 5, mood: 'excited',
    title: 'Berhasil Jalankan Expo', date: '2025-10-02',
    preview: 'Akhirnya aplikasi pertamaku tampil di Expo Go! Rasanya senang sekali...',
    body: 'Akhirnya aplikasi pertamaku tampil di Expo Go! Awalnya sempat gagal terhubung karena beda jaringan Wi-Fi, tapi setelah dicek ulang semuanya berjalan lancar.',
    moodUri: 'https://picsum.photos/seed/excited/200',
    heroUri: 'https://picsum.photos/seed/excitedhero/800/450',
  },
  {
    id: 6, mood: 'happy',
    title: 'Ngopi Bareng Teman', date: '2025-10-01',
    preview: 'Sore ini ngobrol santai dengan teman lama sambil menikmati kopi hangat...',
    body: 'Sore ini ngobrol santai dengan teman lama sambil menikmati kopi hangat. Banyak cerita seru yang dibagikan, dan kami berencana bertemu lagi akhir bulan.',
    moodUri: require('../../assets/moods/happy.png'),
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  // key berubah => FlatList dibuat ulang saat numColumns berubah
  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        mood={item.mood}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image
          source={require('../../assets/avatar.png')}
          style={styles.avatar}
          accessibilityLabel="Foto profil pengguna"
        />
        <View>
          <Text style={styles.header}>Buku Harian</Text>
          <Text style={styles.subheader}>{DATA.length} entri</Text>
        </View>
      </View>

      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{ padding: SPACE.l, gap: SPACE.m, paddingTop: SPACE.m }}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada entri.</Text>}
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
  },
  avatar: { width: 48, height: 48, borderRadius: RADIUS.avatar },
  header: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
  subheader: { fontSize: TYPO.caption, color: COLORS.muted },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});
