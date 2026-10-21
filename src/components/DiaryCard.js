import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACE, RADIUS, TYPO, MOODS } from '../styles/tokens';
import { toSource } from '../utils/imageSource';

// Presentational component: semua data & aksi datang dari props.
export default function DiaryCard({
  title, date, preview, moodUri, mood = 'calm',
  liked = false, onToggleLike, onPress, variant = 'list',
}) {
  const moodInfo = MOODS[mood] || MOODS.calm;

  return (
    <View>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: COLORS.border }}
        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Entri ${title} tanggal ${date}, mood ${moodInfo.label}`}
        accessibilityHint="Ketuk untuk membuka detail entri"
      >
        <View
          style={[
            styles.card,
            variant === 'grid' && styles.cardGrid,
            { borderColor: moodInfo.color },
          ]}
        >
          {moodUri ? (
            <Image source={toSource(moodUri)} style={styles.mood} />
          ) : (
            <View style={[styles.mood, styles.moodFallback, { backgroundColor: moodInfo.color }]}>
              <Text style={styles.moodInitial}>{title.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
              {preview}
            </Text>
            <View style={[styles.badge, { borderColor: moodInfo.color }]}>
              <Text style={[styles.badgeText, { color: moodInfo.color }]}>
                {moodInfo.label}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      {/* Sibling (bukan di dalam Pressable kartu) agar tidak ada Pressable bersarang */}
      <Pressable
        onPress={onToggleLike}
        hitSlop={8}
        style={styles.like}
        accessibilityRole="button"
        accessibilityState={{ selected: liked }}
        accessibilityLabel={liked ? `Batal suka entri ${title}` : `Sukai entri ${title}`}
      >
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={24}
          color={liked ? COLORS.like : COLORS.muted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    minHeight: 88,
    borderWidth: 1.5,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  cardGrid: { minHeight: 120 },
  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    backgroundColor: COLORS.placeholder,
  },
  moodFallback: { alignItems: 'center', justifyContent: 'center' },
  moodInitial: { color: COLORS.onAccent, fontSize: TYPO.h2, fontWeight: '700' },
  content: { flex: 1 },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text, marginRight: 32 },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: 6 },
  preview: { fontSize: TYPO.body, color: COLORS.text },
  badge: {
    alignSelf: 'flex-start',
    marginTop: SPACE.s,
    paddingHorizontal: SPACE.s,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: RADIUS.pill,
  },
  badgeText: { fontSize: TYPO.caption, fontWeight: '600' },
  like: { position: 'absolute', top: SPACE.m, right: SPACE.m },
});