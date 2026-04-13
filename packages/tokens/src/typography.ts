export type TypographyToken = {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  fontWeight?: number;
};

/**
 * Uranus typography tokens.
 *
 * Per Uranus_Manual_de_Marca_2026.pdf (page 06):
 *   Lexend Exa — primary / display (headings, brand moments)
 *   Poppins    — secondary / body (UI, paragraphs)
 *
 * Fonts are loaded in the apps (docs, storybook) via next/font or a link tag,
 * then referenced here with safe system fallbacks.
 */

const sansStack =
  '"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const displayStack =
  '"Lexend Exa", "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const monoStack =
  'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono", "Roboto Mono", monospace';

export const typography = {
  fontFamily: {
    sans: sansStack,
    display: displayStack,
    mono: monoStack,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
    wider: '0.06em',
    widest: '0.12em',
  },
  scale: {
    xs: { fontSize: '0.75rem', lineHeight: '1rem' },
    sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    base: { fontSize: '1rem', lineHeight: '1.5rem' },
    lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
    '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
    '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
    '5xl': { fontSize: '3rem', lineHeight: '1.1' },
    '6xl': { fontSize: '3.75rem', lineHeight: '1.05' },
    '7xl': { fontSize: '4.5rem', lineHeight: '1' },
  } satisfies Record<string, TypographyToken>,
} as const;
