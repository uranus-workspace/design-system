import {
  type AnchorHTMLAttributes,
  type ElementType,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
} from 'react';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkContext = createContext<ElementType<AnchorProps> | null>(null);

export interface LinkProviderProps {
  /** Component used to render anchors inside blocks. Defaults to `<a>` when not provided. */
  linkComponent?: ElementType<AnchorProps>;
  children: ReactNode;
}

/**
 * Provides a router-aware link component to every block in the tree.
 *
 * Pass `next/link` (or any framework-specific link component) once at the
 * application root so blocks like `AppSidebar`, `AppHeader`, and
 * `SettingsLayout` route via that component without depending on a router.
 */
export function LinkProvider({ linkComponent, children }: LinkProviderProps) {
  return <LinkContext.Provider value={linkComponent ?? null}>{children}</LinkContext.Provider>;
}

/**
 * Resolves the link component from (in order):
 * 1. The `linkComponent` prop passed by the consumer block.
 * 2. The `LinkProvider` context value.
 * 3. The native `'a'` element.
 */
export function useLinkComponent(
  linkComponent?: ElementType<AnchorProps>,
): ElementType<AnchorProps> {
  const fromContext = useContext(LinkContext);
  return linkComponent ?? fromContext ?? 'a';
}

export interface BlockLinkProps extends AnchorProps {
  linkComponent?: ElementType<AnchorProps>;
}

/**
 * Polymorphic anchor used by every block that renders navigational links.
 *
 * Resolves the underlying element via `useLinkComponent`, so consumers can
 * either pass `linkComponent` per-instance or inject one once via
 * `LinkProvider`. Defaults to `<a>` when nothing is provided.
 */
export const BlockLink = forwardRef<HTMLAnchorElement, BlockLinkProps>(function BlockLink(
  { linkComponent, ...props },
  ref,
) {
  const Component = useLinkComponent(linkComponent);
  return <Component ref={ref} {...props} />;
});
