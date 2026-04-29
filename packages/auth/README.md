# @uranus-workspace/auth

Pacote de autenticação genérico OIDC da Uranus Technologies. Cola entre o IdP (Keycloak hoje, qualquer OIDC amanhã) e os blocos visuais já existentes em `@uranus-workspace/blocks`.

> Tracks `@uranus-workspace/design-system@^2`. Veja [CHANGELOG](./CHANGELOG.md).

## Princípios

- **OIDC genérico, Keycloak por preset.** Núcleo nunca importa nada Keycloak-específico. Helpers opcionais em `@uranus-workspace/auth/keycloak`.
- **`oidc-client-ts` como única fonte da verdade.** PKCE S256, sessionStorage, silent renew via iframe.
- **SSR-safe.** Tudo que toca `window`/`sessionStorage`/`location` está atrás de guards ou em `useEffect`.
- **Roteamento agnóstico.** `<AuthCallback>` aceita `onSuccess(returnTo)` / `onError(err)`. Funciona com react-router, tanstack-router, wouter, ou Next.js Router.
- **Multi-entrypoint.** Subpaths (`/core`, `/screens`, `/api`, `/keycloak`, `/nextjs`) evitam puxar peers desnecessários.

## Compatibilidade

| Stack | Caminho |
| --- | --- |
| **Vite SPA** (React 19 + qualquer router) | Caminho default. `<AuthProvider>` + rotas `/callback` e `/silent-renew`. |
| **Next.js App Router 15.x** | Mesmo provider e hooks rodam no client (`'use client'` no entry). Subpath `/nextjs` opcional para validar JWT no edge/server. |

## Instalação

```bash
pnpm add @uranus-workspace/auth @uranus-workspace/design-system @uranus-workspace/blocks
```

`jose` e `next` só são necessários quando você importa de `@uranus-workspace/auth/nextjs`.

## Uso mínimo

```tsx
import { AuthProvider, useAuth, RequireAuth } from '@uranus-workspace/auth';
import { OidcSignInScreen } from '@uranus-workspace/auth/screens';
import { createAuthorizedFetch } from '@uranus-workspace/auth/api';
import { keycloakSignIn, parseKeycloakRoles } from '@uranus-workspace/auth/keycloak';
import { createAuthMiddleware } from '@uranus-workspace/auth/nextjs';
```

Veja a documentação completa em [Design Uranus → Auth](/docs/auth).
