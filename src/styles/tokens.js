// src/styles/tokens.js
export const COLORS = {
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  muted: '#6B7280',
  accent: '#2563EB',
  placeholder: '#EEF2FF',
};

export const SPACE = { xs: 4, s: 8, m: 12, l: 16, xl: 24 };
export const RADIUS = { card: 12, avatar: 32, pill: 999 };
export const TYPO = { h1: 24, h2: 20, title: 16, body: 14, caption: 12 };
export const BREAKPOINTS = { tablet: 600 }; // px

// Variasi tampilan kartu berdasarkan mood (Tugas P2)
export const MOODS = {
  happy:   { label: 'Senang',   color: '#16A34A' },
  focus:   { label: 'Fokus',    color: '#2563EB' },
  calm:    { label: 'Tenang',   color: '#7C3AED' },
  tired:   { label: 'Lelah',    color: '#D97706' },
  excited: { label: 'Semangat', color: '#DB2777' },
};
