<p align="center">
  <a href="https://uranus.com.br/">
    <img src="https://cdn.uranus.com.br/Uranus_Hor_W.png" alt="Uranus" width="260" />
  </a>
</p>

<h1 align="center">Uranus Design System</h1>

<p align="center">
  The design system monorepo for <a href="https://uranus.com.br/">Uranus Technologies</a>. Cosmic tokens, Poppins typography, production-ready React primitives, an optional <strong>AI</strong> package for chat / composer / streaming UIs, and an optional <strong>Auth</strong> package wiring OIDC (Keycloak presets) to the visual blocks.
</p>

<p align="center">
  <a href="https://design.uranus.com.br/">Documentation</a>
  ·
  <a href="https://uranus.com.br/">uranus.com.br</a>
  ·
  <a href="https://www.npmjs.com/org/uranus-workspace">npm</a>
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

Four packages are published publicly to [npm](https://www.npmjs.com/org/uranus-workspace) under the `@uranus-workspace` scope.

| Package | Description | Version |
| --- | --- | --- |
| [`@uranus-workspace/design-system`](./packages/design-system) | Core primitives built on shadcn/ui, Tailwind CSS v4, and Motion. Includes the full shadcn/ui primitive catalog (54+ components). | [![design-system on npm](https://img.shields.io/npm/v/@uranus-workspace/design-system?color=5dddfa&label=%40uranus-workspace%2Fdesign-system)](https://www.npmjs.com/package/@uranus-workspace/design-system) |
| [`@uranus-workspace/blocks`](./packages/blocks) | Higher-level composite components (page headers, empty states, app shells…) assembled from primitives. | [![blocks on npm](https://img.shields.io/npm/v/@uranus-workspace/blocks?color=082d71&label=%40uranus-workspace%2Fblocks)](https://www.npmjs.com/package/@uranus-workspace/blocks) |
| [`@uranus-workspace/ai`](./packages/ai) | Chat, composer, streaming, reasoning, and planning surfaces on `design-system` with **Vercel AI SDK** peers. Docs: [design.uranus.com.br/docs/ai](https://design.uranus.com.br/docs/ai). | [![ai on npm](https://img.shields.io/npm/v/@uranus-workspace/ai?color=5dddfa&label=%40uranus-workspace%2Fai)](https://www.npmjs.com/package/@uranus-workspace/ai) |
| [`@uranus-workspace/auth`](./packages/auth) | OIDC (`oidc-client-ts`) with Keycloak presets, React provider/hooks/guards, pre-wired screens composed from `blocks`, authorized fetch helper, and an opt-in Next.js JWKS middleware. Docs: [design.uranus.com.br/docs/auth](https://design.uranus.com.br/docs/auth). | [![auth on npm](https://img.shields.io/npm/v/@uranus-workspace/auth?color=f8ddfc&label=%40uranus-workspace%2Fauth)](https://www.npmjs.com/package/@uranus-workspace/auth) |

### Install

No auth, no `.npmrc`. Install straight from the public npm registry.

**Core + blocks** — `motion` is a peer dependency and must be installed alongside these packages:

```bash
pnpm add @uranus-workspace/design-system @uranus-workspace/blocks motion
```

**With AI surfaces** — add [`@uranus-workspace/ai`](./packages/ai) plus Vercel AI SDK and app peers (see [`packages/ai/package.json`](./packages/ai/package.json)):

```bash
pnpm add @uranus-workspace/ai @uranus-workspace/design-system ai @ai-sdk/react motion react react-dom
```

Optional peers for Markdown rendering in messages (`MessageMarkdown`, etc.):

```bash
pnpm add react-markdown remark-gfm
```

More detail: [`packages/ai/README.md`](./packages/ai/README.md).

**With Auth** — add [`@uranus-workspace/auth`](./packages/auth). `oidc-client-ts` is a direct dependency, so the only required peers are `react`, `react-dom`, and (when you import the screens) `@uranus-workspace/blocks`:

```bash
pnpm add @uranus-workspace/auth @uranus-workspace/design-system @uranus-workspace/blocks
```

Optional peers — only required when you import the matching subpath:

```bash
pnpm add jose next            # @uranus-workspace/auth/nextjs only
```

More detail: [`packages/auth/README.md`](./packages/auth/README.md).

## Apps

| App | Description |
| --- | --- |
| [`apps/docs`](./apps/docs) | Public documentation site — [design.uranus.com.br](https://design.uranus.com.br/) — Next.js 15 + Fumadocs MDX. Covers **components**, **blocks**, **AI** ([`/docs/ai`](https://design.uranus.com.br/docs/ai)), and **Auth** ([`/docs/auth`](https://design.uranus.com.br/docs/auth)). |
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

Typography is a single-family system built on **Poppins** — used from body copy through display headings. Cosmic gradient utilities (`bg-cosmic`, `bg-aurora`, `bg-nebula`, `bg-galaxy`, `bg-horizon`, `bg-halo`) ship with the Tailwind preset.

## Stack

- **Monorepo:** Turborepo + pnpm workspaces (pnpm 10.33.0, Node 22)
- **Lint/format:** Biome 1.9 (no ESLint, no Prettier)
- **Types:** TypeScript 5.7 (strict, `noUncheckedIndexedAccess`)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`)
- **Animation:** Motion (framer-motion successor)
- **Components:** shadcn/ui sources, owned not imported
- **AI surfaces:** [`@uranus-workspace/ai`](./packages/ai) with Vercel **AI SDK** peers (`ai`, `@ai-sdk/react`); optional [`react-markdown`](https://www.npmjs.com/package/react-markdown) / [`remark-gfm`](https://www.npmjs.com/package/remark-gfm) for Markdown rendering
- **Auth:** [`@uranus-workspace/auth`](./packages/auth) wraps [`oidc-client-ts`](https://github.com/authts/oidc-client-ts) with Keycloak presets and pre-wired screens composed from `blocks`; optional `next` + [`jose`](https://github.com/panva/jose) peers for the JWKS middleware
- **Tests:** Vitest + React Testing Library + jest-axe
- **Docs:** Fumadocs MDX on Next.js 15
- **Versioning:** semantic-release + semantic-release-monorepo
- **Registry:** public npm (`registry.npmjs.org`)

## Getting started

```bash
pnpm install
pnpm dev            # run everything via turbo
pnpm storybook      # Storybook alone
pnpm docs:dev       # docs site alone
pnpm test           # Vitest across publishable packages (design-system, blocks, ai, auth)
pnpm lint           # Biome check
pnpm typecheck      # tsc --noEmit across the workspace
```

## Releasing

Releases are fully automated via [semantic-release](https://semantic-release.gitbook.io/) on the `main` branch:

1. Land a conventional commit (`feat:`, `fix:`, `perf:`, or one with `BREAKING CHANGE:`) touching a publishable package.
2. CI (`.github/workflows/ci.yml`) runs lint → typecheck → test → build → storybook → docs.
3. On CI success, `.github/workflows/release.yml` fires via `workflow_run` and runs `semantic-release` once per package (**`design-system`**, **`blocks`**, **`ai`**, **`auth`**) in order (matrix `max-parallel: 1`):
   - Analyzes commits scoped to that package via `semantic-release-monorepo`.
   - Generates the changelog and release notes.
   - Publishes to the public npm registry as `@uranus-workspace/<pkg>`.
   - Creates a GitHub Release with a scoped git tag (e.g. `@uranus-workspace/design-system@1.2.0`).

No manual versioning. Two repo secrets power the pipeline: `GITHUB_TOKEN` (for GitHub releases and the changelog commit) and `NPM_TOKEN` (an npm automation token with publish access to the `@uranus-workspace` scope).

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
