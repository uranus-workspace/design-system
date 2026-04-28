## Learned User Preferences

- Prefer composition-first blocks: use `children` and slot props (`ReactNode`/components) instead of deep serializable-only prop trees when layout or content varies by product.
- Documentation examples should include usable component previews; tune preview viewport width/height so shell blocks (sidebar, app shell, etc.) render clearly.
- When executing an attached implementation plan: do not edit the plan file itself; use existing todos and advance them sequentially (`in_progress` → done).

## Learned Workspace Facts

- Static Storybook is produced with `pnpm build-storybook`; output is consumed as `storybook-static/` (Turbo and CI align with this artifact path).
- Packages that ship co-located `*.stories.tsx` next to source should declare `@storybook/react` in that package’s `devDependencies` and include story files in its `tsconfig` so TypeScript resolves Storybook types under pnpm’s isolated dependency layout.
- The repo ships workspace `.vscode/settings.json` using `files.exclude` and `search.exclude` for generated and dependency paths (`node_modules`, `dist`, `.turbo`, `.next`, coverage, etc.).
