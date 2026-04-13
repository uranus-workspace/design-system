<p align="center">
  <a href="https://uranus.com.br/">
    <img src="https://cdn.uranus.com.br/Uranus_Hor_W.png" alt="Uranus" width="260" />
  </a>
</p>

<h1 align="center">Uranus Design System</h1>

<p align="center">
  The design system monorepo for <a href="https://uranus.com.br/">Uranus Technologies</a>. Cosmic tokens, Lexend Exa + Poppins, and production-ready React primitives.
</p>

<p align="center">
  <a href="https://design.uranus.com.br/">Documentation</a>
  ·
  <a href="https://uranus.com.br/">uranus.com.br</a>
  ·
  <a href="https://github.com/uranus-workspace/design-system/pkgs/npm/design-system">GitHub Packages</a>
</p>

<p align="center">
  <a href="https://github.com/uranus-workspace/design-system/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/uranus-workspace/design-system/actions/workflows/ci.yml/badge.svg?branch=main" />
  </a>
  <a href="https://github.com/uranus-workspace/design-system/actions/workflows/release.yml">
    <img alt="Release" src="https://github.com/uranus-workspace/design-system/actions/workflows/release.yml/badge.svg?branch=main" />
  </a>
  <a href="https://github.com/uranus-workspace/design-system/releases">
    <img alt="Release" src="https://img.shields.io/github/v/release/uranus-workspace/design-system?sort=semver&display_name=tag&logo=github" />
  </a>
  <a href="https://github.com/uranus-workspace/design-system/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <img alt="Node" src="https://img.shields.io/badge/node-%E2%89%A522-brightgreen?logo=nodedotjs" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10.33-F69220?logo=pnpm&logoColor=white" />
</p>

---

## Packages

Both packages are published to [GitHub Packages](https://github.com/orgs/uranus-workspace/packages?repo_name=design-system) under the `@uranus-workspace` scope.

| Package | Description | Version |
| --- | --- | --- |
| [`@uranus-workspace/design-system`](./packages/design-system) | Core primitives built on shadcn/ui, Tailwind CSS v4, and Motion. Includes the full shadcn/ui primitive catalog (54+ components). | [![design-system version](https://img.shields.io/github/v/tag/uranus-workspace/design-system?filter=%40uranus-workspace%2Fdesign-system%40*&label=%40uranus-workspace%2Fdesign-system&color=5dddfa)](https://github.com/uranus-workspace/design-system/pkgs/npm/design-system) |
| [`@uranus-workspace/blocks`](./packages/blocks) | Higher-level composite components (page headers, empty states, app shells…) assembled from primitives. | [![blocks version](https://img.shields.io/github/v/tag/uranus-workspace/design-system?filter=%40uranus-workspace%2Fblocks%40*&label=%40uranus-workspace%2Fblocks&color=082d71)](https://github.com/uranus-workspace/design-system/pkgs/npm/blocks) |

### Install from GitHub Packages

Both packages live on GitHub Packages. In the consuming project, create a scoped `.npmrc`:

```ini
@uranus-workspace:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install as usual:

```bash
pnpm add @uranus-workspace/design-system @uranus-workspace/blocks
```

## Apps

| App | Description |
| --- | --- |
| [`apps/docs`](./apps/docs) | Public documentation site — [design.uranus.com.br](https://design.uranus.com.br/) — Next.js 15 + Fumadocs MDX. |
| [`apps/storybook`](./apps/storybook) | Storybook 8 component browser with a11y (set to `error`), interactions, and theme addons. |

## Brand

The visual identity is codified in the **Uranus Manual de Marca 2026**. The cosmic palette and typography pairing drive every token in [`packages/tokens`](./packages/tokens):

| Token | HEX | Role |
| --- | --- | --- |
| Azul Profundo | `#000328` | `brand.950` — deep space / dark surfaces |
| Azul Marinho | `#082d71` | `brand.800` — wordmark & primary CTA |
| Azul Turquesa | `#5dddfa` | `brand.400` — accent, focus ring, highlights |
| Lilás Claro | `#f8ddfc` | `accent.200` — decorative highlight |
| Preto Clássico | `#000000` | `neutral.950` |
| Branco Puro | `#ffffff` | `neutral.50` |

Typography pairs **Lexend Exa** (display) with **Poppins** (body). Cosmic gradient utilities (`bg-cosmic`, `bg-aurora`, `bg-nebula`, `bg-galaxy`, `bg-horizon`, `bg-halo`) ship with the Tailwind preset.

## Stack

- **Monorepo:** Turborepo + pnpm workspaces (pnpm 10.33.0, Node 22)
- **Lint/format:** Biome 1.9 (no ESLint, no Prettier)
- **Types:** TypeScript 5.7 (strict, `noUncheckedIndexedAccess`)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`)
- **Animation:** Motion (framer-motion successor)
- **Components:** shadcn/ui sources, owned not imported
- **Tests:** Vitest + React Testing Library + jest-axe
- **Docs:** Fumadocs MDX on Next.js 15
- **Versioning:** semantic-release + semantic-release-monorepo
- **Registry:** GitHub Packages (`npm.pkg.github.com`)

## Getting started

```bash
pnpm install
pnpm dev            # run everything via turbo
pnpm storybook      # Storybook alone
pnpm docs:dev       # docs site alone
pnpm test           # run Vitest across both packages
pnpm lint           # Biome check
pnpm typecheck      # tsc --noEmit across the workspace
```

## Releasing

Releases are fully automated via [semantic-release](https://semantic-release.gitbook.io/) on the `main` branch:

1. Land a conventional commit (`feat:`, `fix:`, `perf:`, or one with `BREAKING CHANGE:`) touching a publishable package.
2. CI (`.github/workflows/ci.yml`) runs lint → typecheck → test → build → storybook → docs.
3. On CI success, `.github/workflows/release.yml` fires via `workflow_run` and, for each publishable package in parallel, runs `semantic-release`:
   - Analyzes commits scoped to that package via `semantic-release-monorepo`.
   - Generates the changelog and release notes.
   - Publishes to GitHub Packages (`@uranus-workspace/<pkg>`).
   - Creates a GitHub Release with a scoped git tag (e.g. `@uranus-workspace/design-system@1.2.0`).

No manual versioning, no `NPM_TOKEN` — the default `GITHUB_TOKEN` with `packages: write` is enough.

## Inspiration

The information architecture and documentation depth draw from:

- [Carbon Design System](https://carbondesignsystem.com/) — IBM
- [Olist Design System](https://designsystem.olist.io/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/)
- [Microsoft Fluent 2](https://fluent2.microsoft.design/)
- [Samsung One UI](https://developer.samsung.com/one-ui/index.html)
- [Wise Design](https://wise.design/design-at-wise)

Visual identity always comes from the Uranus branding manual — those systems are only references for structure, not style.

## License

[MIT](./LICENSE) © [Uranus Technologies](https://uranus.com.br/)
