/**
 * Uranus gradient tokens.
 *
 * Brand manual (page 05) calls out gradients built by mixing Preto Clássico
 * with the three brand blues for "profundidade tridimensional". Lilás Claro is
 * reserved as a highlight accent at the edges of the cosmic palette.
 */

export const gradients = {
  // Primary hero gradient: black → deep → navy, diagonal.
  cosmic: 'linear-gradient(135deg, #000000 0%, #000328 45%, #082d71 100%)',
  // Radial aurora used on dark surfaces to suggest depth.
  aurora:
    'radial-gradient(120% 80% at 0% 100%, #5dddfa 0%, rgba(93,221,250,0) 55%), radial-gradient(120% 80% at 100% 0%, #082d71 0%, rgba(8,45,113,0) 60%), linear-gradient(180deg, #000000 0%, #000328 100%)',
  // Nebula: full cosmic spectrum from deep to lilac.
  nebula: 'linear-gradient(135deg, #000328 0%, #082d71 35%, #5dddfa 75%, #f8ddfc 100%)',
  // Galaxy: vertical fade from pure black to turquoise highlight.
  galaxy: 'linear-gradient(180deg, #000000 0%, #000328 55%, #5dddfa 100%)',
  // Horizon: subtle top-down navy-to-deep gradient for surfaces/cards.
  horizon: 'linear-gradient(180deg, #082d71 0%, #000328 100%)',
  // Halo: soft light lilac glow for highlights.
  halo: 'radial-gradient(closest-side, #f8ddfc 0%, rgba(248,221,252,0) 80%)',
} as const;

export type GradientToken = keyof typeof gradients;
