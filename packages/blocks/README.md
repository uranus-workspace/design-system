# @uranus-workspace/blocks

Composite layout and product blocks built on `@uranus-workspace/design-system`.

## Composition-first API

- Prefer **slots** (`ReactNode` props) and **`children`** so consumers pass real JSX (icons, links, menus) instead of only JSON-shaped config.
- Prefer **compound subcomponents** (e.g. `AppSidebar.Header`, `AppSidebar.Content`) when a block has multiple distinct regions.
- **Compose** existing blocks/primitives; avoid copy-pasting `AlertDialog` / `Sheet` shells — extend via a shared block or a `dialogBody`-style slot.
- Config helpers (e.g. `groups` on `AppSidebar`) may remain as an optional fast path; the compositional tree is the default recommendation for custom nav.

Repository rules and commands live in the root [`CLAUDE.md`](../../CLAUDE.md).
