import React, { useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MoodChip from './MoodChip';
import { COLORS, SPACE, RADIUS, TYPO, MOODS, SIZE } from '../styles/tokens';

export default function SearchBar({ value, onChangeText, mood, onMoodChange, resultCount }) {
  const focus = useRef(new Animated.Value(0)).current;

  const animateTo = (to) =>
    Animated.timing(focus, { toValue: to, duration: 180, useNativeDriver: false }).start();

  const borderColor = focus.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.accent],
  });

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.box, { borderColor }]}>
        <Ionicons name="search" size={20} color={COLORS.muted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => animateTo(1)}
          onBlur={() => animateTo(0)}
          placeholder="Cari judul atau isi entri"
          placeholderTextColor={COLORS.muted}
          style={styles.input}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel="Cari entri diary"
        />
        {value.length > 0 && (
          <Pressable
            onPress={() => onChangeText('')}
            hitSlop={8}
            style={styles.clear}
            accessibilityRole="button"
            accessibilityLabel="Hapus pencarian"
          >
            <Ionicons name="close-circle" size={22} color={COLORS.muted} />
          </Pressable>
        )}
      </Animated.View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.chips}
      >
        <MoodChip
          label="Semua"
          a11yLabel="Tampilkan semua mood"
          active={mood === null}
          onPress={() => onMoodChange(null)}
        />
        {Object.entries(MOODS).map(([key, m]) => (
          <MoodChip
            key={key}
            label={m.label}
            a11yLabel={`Filter mood ${m.label}`}
            color={m.color}
            active={mood === key}
            onPress={() => onMoodChange(mood === key ? null : key)}
          />
        ))}
      </ScrollView>

      <Text style={styles.count} accessibilityLiveRegion="polite">
        {resultCount} entri ditemukan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: SPACE.l, paddingTop: SPACE.m, gap: SPACE.s },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    minHeight: SIZE.touch,
    paddingHorizontal: SPACE.m,
    borderWidth: 1.5,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  input: { flex: 1, fontSize: TYPO.title, color: COLORS.text, paddingVertical: SPACE.s },
  clear: { alignItems: 'center', justifyContent: 'center' },
  chips: { gap: SPACE.s, paddingVertical: SPACE.xs },
  count: { fontSize: TYPO.caption, color: COLORS.muted },
});