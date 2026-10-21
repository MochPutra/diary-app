import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function MoodChip({ label, color = COLORS.accent, active, onPress, a11yLabel }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      accessibilityLabel={a11yLabel || label}
      style={({ pressed }) => [
        styles.chip,
        { borderColor: color },
        active && { backgroundColor: color },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, { color: active ? COLORS.onAccent : color }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: SPACE.l,
    borderWidth: 1.5,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.96 }] },
  text: { fontSize: TYPO.body, fontWeight: '600' },
});