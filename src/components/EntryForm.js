import React, { useEffect, useRef, useState } from 'react';
import {
  Modal, View, Text, TextInput, Pressable, ScrollView, Animated,
  KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoodChip from './MoodChip';
import { COLORS, SPACE, RADIUS, TYPO, MOODS, SIZE } from '../styles/tokens';

const TITLE_MAX = 50;
const BODY_MAX = 500;
const BODY_MIN = 10;

export default function EntryForm({ visible, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState('calm');
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setTitle('');
      setBody('');
      setMood('calm');
      setSubmitted(false);
    }
  }, [visible]);

  const titleError = title.trim().length === 0 ? 'Judul wajib diisi.' : null;
  const bodyError =
    body.trim().length < BODY_MIN ? `Cerita minimal ${BODY_MIN} karakter.` : null;
  const moodInfo = MOODS[mood];

  const runShake = () => {
    Animated.sequence(
      [10, -10, 6, -6, 0].map((v) =>
        Animated.timing(shake, { toValue: v, duration: 50, useNativeDriver: true })
      )
    ).start();
  };

  const handleSave = () => {
    setSubmitted(true);
    if (titleError || bodyError) {
      runShake();
      return;
    }
    onSubmit({ title: title.trim(), body: body.trim(), mood });
    onClose();
  };

  const inputStyle = (field, error) => [
    styles.input,
    focused === field && styles.inputFocused,
    submitted && error && styles.inputError,
  ];

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={[styles.moodBar, { backgroundColor: moodInfo.color }]} />

        <View style={styles.header}>
          <Text style={styles.heading} accessibilityRole="header">Entri baru</Text>
          <Pressable
            onPress={onClose}
            style={styles.cancel}
            accessibilityRole="button"
            accessibilityLabel="Batal, tutup formulir"
          >
            <Text style={styles.cancelText}>Batal</Text>
          </Pressable>
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
            <View style={styles.field}>
              <Text style={styles.label}>Judul</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                onFocus={() => setFocused('title')}
                onBlur={() => setFocused(null)}
                maxLength={TITLE_MAX}
                placeholder="Contoh: Pagi yang tenang"
                placeholderTextColor={COLORS.muted}
                style={inputStyle('title', titleError)}
                accessibilityLabel="Judul entri"
              />
              <View style={styles.meta}>
                <Text style={styles.error} accessibilityLiveRegion="polite">
                  {submitted && titleError ? titleError : ' '}
                </Text>
                <Text style={styles.counter}>{title.length}/{TITLE_MAX}</Text>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Cerita hari ini</Text>
              <TextInput
                value={body}
                onChangeText={setBody}
                onFocus={() => setFocused('body')}
                onBlur={() => setFocused(null)}
                maxLength={BODY_MAX}
                multiline
                textAlignVertical="top"
                placeholder="Apa yang kamu alami hari ini?"
                placeholderTextColor={COLORS.muted}
                style={[...inputStyle('body', bodyError), styles.textarea]}
                accessibilityLabel="Isi cerita entri"
              />
              <View style={styles.meta}>
                <Text style={styles.error} accessibilityLiveRegion="polite">
                  {submitted && bodyError ? bodyError : ' '}
                </Text>
                <Text style={[styles.counter, body.length >= BODY_MAX * 0.9 && styles.counterWarn]}>
                  {body.length}/{BODY_MAX}
                </Text>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Suasana hati</Text>
              <View style={styles.moods}>
                {Object.entries(MOODS).map(([key, m]) => (
                  <MoodChip
                    key={key}
                    label={m.label}
                    a11yLabel={`Pilih mood ${m.label}`}
                    color={m.color}
                    active={mood === key}
                    onPress={() => setMood(key)}
                  />
                ))}
              </View>
            </View>

            <Animated.View style={{ transform: [{ translateX: shake }] }}>
              <Pressable
                onPress={handleSave}
                style={({ pressed }) => [
                  styles.save,
                  { backgroundColor: moodInfo.color },
                  pressed && styles.savePressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Simpan entri"
              >
                <Text style={styles.saveText}>Simpan entri</Text>
              </Pressable>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: COLORS.surface },
  moodBar: { height: 4 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.m,
  },
  heading: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
  cancel: { minHeight: SIZE.touch, minWidth: SIZE.touch, justifyContent: 'center', alignItems: 'flex-end' },
  cancelText: { fontSize: TYPO.title, fontWeight: '600', color: COLORS.accent },
  form: { padding: SPACE.l, gap: SPACE.m },
  field: { gap: SPACE.xs },
  label: { fontSize: TYPO.body, fontWeight: '600', color: COLORS.text },
  input: {
    minHeight: SIZE.touch,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    fontSize: TYPO.title,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  inputFocused: { borderColor: COLORS.accent, backgroundColor: COLORS.accentSoft },
  inputError: { borderColor: COLORS.danger },
  textarea: { minHeight: 140 },
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  error: { flex: 1, fontSize: TYPO.caption, color: COLORS.danger },
  counter: { fontSize: TYPO.caption, color: COLORS.muted },
  counterWarn: { color: COLORS.danger, fontWeight: '700' },
  moods: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.s },
  save: {
    minHeight: SIZE.touch,
    marginTop: SPACE.s,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.card,
  },
  savePressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  saveText: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.onAccent },
});