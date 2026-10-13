import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO, MOODS } from '../styles/tokens';
import { toSource } from '../utils/imageSource';

export default function DiaryCard({
  title, date, preview, moodUri, mood = 'calm', onPress, variant = 'list',
}) {
  const moodInfo = MOODS[mood] || MOODS.calm;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: COLORS.border }}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Entri ${title} tanggal ${date}, mood ${moodInfo.label}`}
    >
      <View
        style={[
          styles.card,
          variant === 'grid' && styles.cardGrid,
          { borderColor: moodInfo.color },
        ]}
      >
        <Image source={toSource(moodUri)} style={styles.mood} />
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
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    minHeight: 88, // target sentuh > 44dp
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
  content: { flex: 1 },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
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
});
