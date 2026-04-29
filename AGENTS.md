## Learned User Preferences

- Prefer composition-first blocks: use `children` and slot props (`ReactNode`/components) instead of deep serializable-only prop trees when layout or content varies by product.
- Documentation examples should include usable component previews; tune viewport width/height/`minHeight` and center when needed (`ComponentPreview`), including shell layouts and card-framed flows (for example centered auth/registry demos). For dense or tall flows such as AI chat, frame examples in a modal/dialog or otherwise enlarge the preview so the UI is not cramped or cropped.
- Interactive states in docs examples and blocks should keep **readable text contrast**; avoid hover/focus treatments (for example low-contrast blue-on-blue) that obscure labels or body copy.
- For **AI chat and message** examples in docs/registry, **render assistant copy as Markdown** and **syntax-highlight code** in fenced blocks (support a broad set of languages such as JSON, SQL, and TypeScript—not only one language).
- For blocks that ship **forms**, prefer exported **Zod** schemas and **`react-hook-form`** wired to **`Form` / `FormField`** primitives from `@uranus-workspace/design-system` instead of relying only on manual `FormData` or unstructured state.
- Auth-related blocks: compose **OAuth** (Google/Microsoft and other providers) with credential fields via **slots/components**, and explicitly support variants such as password login, OAuth-only, or both.
- When executing an attached implementation plan: do not edit the plan file itself; use existing todos and advance them sequentially (`in_progress` → done).

## Learned Workspace Facts

- Static Storybook is produced with `pnpm build-storybook`; output is consumed as `storybook-static/` (Turbo and CI align with this artifact path).
- Packages that ship co-located `*.stories.tsx` next to source should declare `@storybook/react` in that package’s `devDependencies` and include story files in its `tsconfig` so TypeScript resolves Storybook types under pnpm’s isolated dependency layout.
- The repo ships workspace `.vscode/settings.json` using `files.exclude` and `search.exclude` for generated and dependency paths (`node_modules`, `dist`, `.turbo`, `.next`, coverage, etc.).
- The **`apps/docs`** app centralizes canonical site URL in **`lib/site.ts`** via **`getSiteUrl()`**, default **`https://design.uranus.com.br`** unless overridden (`NEXT_PUBLIC_SITE_URL` / `VERCEL_URL`) — used for metadata, discovery routes (`.well-known`, `llms.txt`, Link headers), and absolute links.
