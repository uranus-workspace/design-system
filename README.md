# Uranus Design System

The design system monorepo for [Uranus Technologies](https://uranus.com.br/). It produces two publishable npm packages and one public documentation site.

## Packages

| Package | Description |
|---|---|
| [`@uranus-workspace/design-system`](./packages/design-system) | Core primitives built on shadcn/ui, Tailwind CSS v4, and Motion. |
| [`@uranus-workspace/blocks`](./packages/blocks) | Higher-level composite components (page headers, empty states, app shells…) assembled from primitives. |

## Apps

| App | Description |
|---|---|
| [`apps/docs`](./apps/docs) | Public documentation site (Next.js 15 + Fumadocs MDX). |
| [`apps/storybook`](./apps/storybook) | Storybook 8 component browser with a11y, interactions, and theme addons. |

## Stack

- **Monorepo:** Turborepo + pnpm workspaces (pnpm 10.33.0, Node 22)
- **Lint/format:** Biome 1.9
- **Types:** TypeScript 5.7
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`)
- **Animation:** Motion (framer-motion successor)
- **Components:** shadcn/ui sources, owned not imported
- **Tests:** Vitest + React Testing Library + jest-axe
- **Docs:** Fumadocs MDX on Next.js 15
- **Versioning:** Changesets + GitHub Actions

## Getting started

```bash
pnpm install
pnpm dev            # run everything via turbo
pnpm storybook      # Storybook alone
pnpm docs:dev       # docs site alone
pnpm test           # run Vitest across both packages
pnpm lint           # Biome check
```

## Publishing

```bash
pnpm changeset      # describe a change
pnpm changeset version
pnpm release        # via GitHub Actions on main
```

## Inspiration

The information architecture and documentation depth draw from:

- [Carbon Design System](https://carbondesignsystem.com/)
- [Olist Design System](https://designsystem.olist.io/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/)
- [Microsoft Fluent 2](https://fluent2.microsoft.design/)
- [Samsung One UI](https://developer.samsung.com/one-ui/index.html)
- [Wise Design](https://wise.design/design-at-wise)

Visual identity comes from the Uranus branding manual — those systems are only references for structure, not style.
