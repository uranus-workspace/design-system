# @uranus-workspace/ai

Componentes para aplicações de IA (chat, composer, streaming, áudio, anexos, raciocínio, planejamento e pesquisa) construídos sobre `@uranus-workspace/design-system` e a Vercel AI SDK como peer first-class.

Princípios:

- **Apresentacionais por padrão.** O usuário fornece transporte/estado. `Chat` aceita `messages` + `status` + `onSend` quando você não usa o hook.
- **AI SDK first-class.** Use `useUranusChat` para envolver `useChat` do `@ai-sdk/react` com tipos da Uranus, status normalizado (`idle | thinking | searching | streaming | submitted | error`) e suporte a `mode` (`chat | plan | research`).
- **Composição.** `Composer.Root`, `Composer.Textarea`, `Composer.AttachButton`, `Composer.RecordButton`, `Composer.ModeToggle`, etc. Slots e compound components, igual ao padrão do `@uranus-workspace/blocks`.
- **A11y.** Indicadores de status anunciam via `role="status"` com `aria-live="polite"`. Reduzimos animação quando `prefers-reduced-motion: reduce`.

Veja a documentação completa em [Design Uranus → AI](/docs/ai).
