/**
 * Placeholder color tokens. Replace with values derived from the Uranus branding manual PDF.
 * Structure is stable — only values change when the manual is ingested.
 */

export type ColorScale = Record<
  50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
  string
>;
export type ColorToken = string;

const neutral: ColorScale = {
  50: 'oklch(0.985 0 0)',
  100: 'oklch(0.97 0 0)',
  200: 'oklch(0.922 0 0)',
  300: 'oklch(0.87 0 0)',
  400: 'oklch(0.708 0 0)',
  500: 'oklch(0.556 0 0)',
  600: 'oklch(0.439 0 0)',
  700: 'oklch(0.371 0 0)',
  800: 'oklch(0.269 0 0)',
  900: 'oklch(0.205 0 0)',
  950: 'oklch(0.145 0 0)',
};

const brand: ColorScale = {
  50: 'oklch(0.971 0.014 260)',
  100: 'oklch(0.938 0.045 260)',
  200: 'oklch(0.882 0.087 260)',
  300: 'oklch(0.81 0.125 260)',
  400: 'oklch(0.72 0.155 260)',
  500: 'oklch(0.63 0.175 260)',
  600: 'oklch(0.55 0.18 260)',
  700: 'oklch(0.47 0.165 260)',
  800: 'oklch(0.4 0.14 260)',
  900: 'oklch(0.33 0.11 260)',
  950: 'oklch(0.24 0.08 260)',
};

const success: ColorScale = {
  50: 'oklch(0.97 0.02 150)',
  100: 'oklch(0.93 0.05 150)',
  200: 'oklch(0.87 0.09 150)',
  300: 'oklch(0.8 0.13 150)',
  400: 'oklch(0.72 0.16 150)',
  500: 'oklch(0.63 0.18 150)',
  600: 'oklch(0.55 0.17 150)',
  700: 'oklch(0.47 0.15 150)',
  800: 'oklch(0.4 0.13 150)',
  900: 'oklch(0.33 0.1 150)',
  950: 'oklch(0.24 0.08 150)',
};

const warning: ColorScale = {
  50: 'oklch(0.985 0.02 85)',
  100: 'oklch(0.95 0.05 85)',
  200: 'oklch(0.9 0.1 85)',
  300: 'oklch(0.85 0.14 85)',
  400: 'oklch(0.78 0.16 85)',
  500: 'oklch(0.72 0.18 85)',
  600: 'oklch(0.63 0.17 85)',
  700: 'oklch(0.54 0.15 85)',
  800: 'oklch(0.45 0.13 85)',
  900: 'oklch(0.37 0.1 85)',
  950: 'oklch(0.27 0.08 85)',
};

const danger: ColorScale = {
  50: 'oklch(0.97 0.02 25)',
  100: 'oklch(0.94 0.05 25)',
  200: 'oklch(0.88 0.1 25)',
  300: 'oklch(0.8 0.15 25)',
  400: 'oklch(0.71 0.19 25)',
  500: 'oklch(0.63 0.21 25)',
  600: 'oklch(0.55 0.2 25)',
  700: 'oklch(0.47 0.17 25)',
  800: 'oklch(0.4 0.14 25)',
  900: 'oklch(0.33 0.11 25)',
  950: 'oklch(0.24 0.08 25)',
};

export const colors = {
  neutral,
  brand,
  success,
  warning,
  danger,
} as const;
