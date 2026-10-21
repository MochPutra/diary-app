import React from 'react';
import { Modal, View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';
import { toSource } from '../utils/imageSource';

export default function DiaryDetailModal({ visible, onClose, entry, liked = false, onToggleLike }) {
  if (!entry) return null;
  const { title, date, body, heroUri, moodUri } = entry;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose} // tombol back Android
    >
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView>
          <Image
            source={toSource(heroUri || moodUri)}
            style={styles.hero}
            resizeMode="contain"
          />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>

            <Pressable
              onPress={onToggleLike}
              style={styles.likeBtn}
              accessibilityRole="button"
              accessibilityState={{ selected: liked }}
              accessibilityLabel={liked ? 'Batal suka entri' : 'Sukai entri'}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={24}
                color={liked ? COLORS.like : COLORS.muted}
              />
              <Text style={[styles.likeText, liked && { color: COLORS.like }]}>
                {liked ? 'Disukai' : 'Sukai'}
              </Text>
            </Pressable>

            <Text style={styles.body}>{body}</Text>
            <Pressable
              onPress={onClose}
              style={styles.button}
              accessibilityRole="button"
              accessibilityLabel="Tutup detail entri"
            >
              <Text style={styles.buttonText}>Tutup</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  hero: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.placeholder,
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: { padding: SPACE.l, gap: SPACE.s },
  title: { fontSize: TYPO.h2, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: SPACE.s },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: SPACE.s,
    minHeight: 44,
  },
  likeText: { fontSize: TYPO.body, fontWeight: '600', color: COLORS.muted },
  body: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 },
  button: {
    marginTop: SPACE.l,
    padding: SPACE.m,
    minHeight: 48,
    justifyContent: 'center',
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: TYPO.title },
});