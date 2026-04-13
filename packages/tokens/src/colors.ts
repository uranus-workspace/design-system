/**
 * Uranus brand color tokens. Values derived from Uranus_Manual_de_Marca_2026.pdf.
 *
 * Core palette (page 05 of the brand manual):
 *   Azul Profundo  #000328   (brand-950) — deep space
 *   Azul Marinho   #082d71   (brand-800) — navy
 *   Azul Turquesa  #5dddfa   (brand-400) — turquoise accent
 *   Lilás Claro    #f8ddfc   (accent-200) — lilac highlight
 *   Preto Clássico #000000   (neutral-950)
 *   Branco Puro    #ffffff   (neutral-50)
 *
 * Scales are hand-tuned to interpolate smoothly between the pinned brand stops
 * so `cosmic` gradients (black → deep → navy → turquoise → lilac) stay on-brand.
 */

export type ColorScale = Record<
  50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
  string
>;
export type ColorToken = string;

const neutral: ColorScale = {
  50: '#ffffff',
  100: '#f5f6f8',
  200: '#e5e7ec',
  300: '#c9cdd6',
  400: '#9aa0ad',
  500: '#6b7180',
  600: '#4a4f5c',
  700: '#33373f',
  800: '#1c1e24',
  900: '#0b0c10',
  950: '#000000',
};

const brand: ColorScale = {
  50: '#eefbff',
  100: '#d7f6ff',
  200: '#aeedff',
  300: '#7ce3fc',
  400: '#5dddfa',
  500: '#2ab4de',
  600: '#1b7fb2',
  700: '#134f8e',
  800: '#082d71',
  900: '#031852',
  950: '#000328',
};

const accent: ColorScale = {
  50: '#fefaff',
  100: '#fceffe',
  200: '#f8ddfc',
  300: '#f0bff7',
  400: '#e497f0',
  500: '#d06de6',
  600: '#b548cb',
  700: '#8e35a0',
  800: '#662473',
  900: '#431349',
  950: '#24082a',
};

const success: ColorScale = {
  50: '#ecfdf5',
  100: '#d1fae5',
  200: '#a7f3d0',
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981',
  600: '#059669',
  700: '#047857',
  800: '#065f46',
  900: '#064e3b',
  950: '#022c22',
};

const warning: ColorScale = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
};

const danger: ColorScale = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
};

export const colors = {
  neutral,
  brand,
  accent,
  success,
  warning,
  danger,
} as const;
