import React, { useMemo, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';
import { COLORS, SPACE, TYPO, RADIUS, BREAKPOINTS, SIZE } from '../styles/tokens';

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

const pad = (n) => String(n).padStart(2, '0');
const todayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;

  const [entries, setEntries] = useState(DATA);
  const [query, setQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState(null);

  const [selected, setSelected] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const keyForCols = twoCols ? 'grid2' : 'list1';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const moodOk = !moodFilter || e.mood === moodFilter;
      const textOk = !q || e.title.toLowerCase().includes(q) || e.body.toLowerCase().includes(q);
      return moodOk && textOk;
    });
  }, [entries, query, moodFilter]);

  const openEntry = (item) => {
    setSelected(item);
    setDetailVisible(true);
  };

  const addEntry = ({ title, body, mood }) => {
    const entry = {
      id: Date.now(),
      mood,
      title,
      body,
      date: todayString(),
      preview: body.length > 90 ? `${body.slice(0, 90)}...` : body,
    };
    setEntries((prev) => [entry, ...prev]);
    setQuery('');
    setMoodFilter(null);
  };

  const resetFilter = () => {
    setQuery('');
    setMoodFilter(null);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        mood={item.mood}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => openEntry(item)}
      />
    </View>
  );

  const hasFilter = query.trim() !== '' || moodFilter !== null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image
          source={require('../../assets/avatar.png')}
          style={styles.avatar}
          accessible
          accessibilityRole="image"
          accessibilityLabel="Foto profil pengguna"
        />
        <View>
          <Text style={styles.header} accessibilityRole="header">Buku Harian</Text>
          <Text style={styles.subheader}>{entries.length} entri</Text>
        </View>
      </View>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        mood={moodFilter}
        onMoodChange={setMoodFilter}
        resultCount={filtered.length}
      />

      <FlatList
        key={keyForCols}
        data={filtered}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        columnWrapperStyle={twoCols ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              {hasFilter ? 'Tidak ada entri yang cocok' : 'Belum ada entri'}
            </Text>
            <Text style={styles.empty}>
              {hasFilter
                ? 'Coba kata kunci lain atau hapus filter mood.'
                : 'Ketuk "Tulis entri" untuk membuat catatan pertamamu.'}
            </Text>
            {hasFilter && (
              <Pressable
                onPress={resetFilter}
                style={styles.resetBtn}
                accessibilityRole="button"
                accessibilityLabel="Hapus pencarian dan filter"
              >
                <Text style={styles.resetText}>Hapus filter</Text>
              </Pressable>
            )}
          </View>
        }
      />

      <Pressable
        onPress={() => setFormVisible(true)}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        accessibilityRole="button"
        accessibilityLabel="Tulis entri baru"
      >
        <Ionicons name="add" size={24} color={COLORS.onAccent} />
        <Text style={styles.fabText}>Tulis entri</Text>
      </Pressable>

      <DiaryDetailModal
        visible={detailVisible}
        entry={selected}
        onClose={() => setDetailVisible(false)}
      />
      <EntryForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSubmit={addEntry}
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
  avatar: { width: SIZE.avatar, height: SIZE.avatar, borderRadius: RADIUS.avatar },
  header: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
  subheader: { fontSize: TYPO.caption, color: COLORS.muted },
  columnWrapper: { gap: SPACE.m },
  listContent: {
    padding: SPACE.l,
    paddingTop: SPACE.m,
    paddingBottom: 96,
    gap: SPACE.m,
  },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 },
  emptyBox: { alignItems: 'center', gap: SPACE.s, marginTop: SPACE.xl },
  emptyTitle: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  empty: { textAlign: 'center', color: COLORS.muted, fontSize: TYPO.body },
  resetBtn: {
    minHeight: SIZE.touch,
    justifyContent: 'center',
    paddingHorizontal: SPACE.l,
    borderRadius: RADIUS.pill,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  resetText: { color: COLORS.accent, fontWeight: '700', fontSize: TYPO.body },
  fab: {
    position: 'absolute',
    right: SPACE.l,
    bottom: SPACE.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    minHeight: SIZE.touch,
    paddingHorizontal: SPACE.l,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accent,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  fabPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
  fabText: { color: COLORS.onAccent, fontWeight: '700', fontSize: TYPO.title },
});