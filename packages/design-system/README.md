# @uranus-workspace/design-system

Core primitives of the Uranus design system — shadcn/ui sources tailored for Tailwind CSS v4 and the Uranus token preset.

## Peer dependencies

Components are React 19+ and import primitives from Radix UI plus shared tokens from `@uranus-workspace/tokens` via the Tailwind preset in `@uranus-workspace/tailwind-config`. Motion variants from `@uranus-workspace/design-system/lib/motion` are powered by **Motion** (peer).

## Conventions

- One folder per component under `src/components/<name>/` with implementation, optional `*.variants.ts` (CVA), `*.test.tsx`, `*.stories.tsx`, and `index.ts`.
- All visual styles route through semantic tokens (`--color-primary`, `--color-accent`, …); never hardcode hex/px values.
- Hover and focus styles must keep readable text contrast — pair `bg-accent` with `text-accent-foreground` on interactive states across compound primitives.

Repository rules and commands live in the root [`CLAUDE.md`](../../CLAUDE.md).
