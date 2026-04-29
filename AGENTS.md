## Learned User Preferences

- Prefer composition-first blocks: use `children` and slot props (`ReactNode`/components) instead of deep serializable-only prop trees when layout or content varies by product.
- Documentation examples should include usable component previews; tune viewport width/height/`minHeight` and center when needed (`ComponentPreview`), including shell layouts and card-framed flows (for example centered auth/registry demos). For dense or tall flows such as AI chat, frame examples in a modal/dialog, make the chat full width/height when needed, center mode tabs, and provide comfortable scrolling.
- Interactive states in docs examples and blocks should keep **readable text contrast**; avoid hover/focus treatments (for example low-contrast blue-on-blue) that obscure labels or body copy. On light-blue hovers use dark/black foreground text; on blue backgrounds use white foreground text.
- AI chat components and examples should feel clean/minimal like Claude Desktop: mode selector for Agent/Plan/Research, plus menu/connections, and photo/audio actions on the right.
- For **AI chat and message** examples in docs/registry, **render assistant copy as Markdown** and **syntax-highlight code** in fenced blocks (support a broad set of languages such as JSON, SQL, and TypeScript—not only one language).
- For blocks that ship **forms**, prefer exported **Zod** schemas and **`react-hook-form`** wired to **`Form` / `FormField`** primitives from `@uranus-workspace/design-system` instead of relying only on manual `FormData` or unstructured state.
- Auth-related blocks: compose **OAuth** (Google/Microsoft and other providers) with credential fields via **slots/components**, and explicitly support variants such as password login, OAuth-only, or both.
- When executing an attached implementation plan: do not edit the plan file itself; use existing todos and advance them sequentially (`in_progress` → done).

## Learned Workspace Facts

- Static Storybook is produced with `pnpm build-storybook`; output is consumed as `storybook-static/`. The dedicated Vercel app uses `apps/storybook` as root and `apps/storybook/vercel.json` builds via `pnpm turbo run build-storybook --filter=@uranus-workspace/storybook`.
- Packages that ship co-located `*.stories.tsx` next to source should declare `@storybook/react` in that package’s `devDependencies` and include story files in its `tsconfig` so TypeScript resolves Storybook types under pnpm’s isolated dependency layout.
- The repo ships workspace `.vscode/settings.json` using `files.exclude` and `search.exclude` for generated and dependency paths (`node_modules`, `dist`, `.turbo`, `.next`, coverage, etc.).
- The **`apps/docs`** app centralizes canonical site URL in **`lib/site.ts`** via **`getSiteUrl()`**, default **`https://design.uranus.com.br`** unless overridden (`NEXT_PUBLIC_SITE_URL` / `VERCEL_URL`) — used for metadata, discovery routes (`.well-known`, `llms.txt`, Link headers), and absolute links.
- The monorepo includes publishable **`@uranus-workspace/ai`** components for chat, composer, streaming, audio, attachments, reasoning, and planning surfaces; it composes `@uranus-workspace/design-system` and peers on the Vercel AI SDK packages plus optional Markdown rendering deps.
- The monorepo includes publishable **`@uranus-workspace/auth`** — generic OIDC (`oidc-client-ts`) with Keycloak presets, React provider/hooks/guards, pre-wired screens composed from `@uranus-workspace/blocks`, an authorized fetch helper, and an opt-in Next.js JWKS middleware (peers `next` + `jose`). Multi-entry build (`./core`, `./screens`, `./api`, `./keycloak`, `./nextjs`) so consumers only pull the peers they actually use. SSR-safe: `UserManager` is lazy and only instantiated inside `useEffect`.
- Renovate manages npm/pnpm dependency updates from `renovate.json`; Dependabot is intentionally limited to GitHub Actions in `.github/dependabot.yml` to avoid duplicate dependency PRs.
