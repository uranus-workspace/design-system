---
description: Add or change primitives and blocks following the repo five-artifact contract and token rules.
---

# Contribute a component or block

## Primitives (`packages/design-system`)

1. Prefer adding via shadcn CLI from `packages/design-system` when applicable.
2. Co-locate: implementation, variants (cva) when needed, `*.test.tsx`, `*.stories.tsx`, and `index.ts`.
3. Export from the package barrel.
4. Add MDX under `apps/docs/content/docs/components/`.
5. Do not hardcode colors or spacing — use tokens and semantic Tailwind theme keys.

## Blocks (`packages/blocks`)

Compose primitives; do not reimplement buttons or dialogs. Use slots/`children` for flexible layout. Same five-artifact rule plus `apps/docs/content/docs/blocks/`.

Run `pnpm lint`, `pnpm typecheck`, and `pnpm test` before opening a PR.
