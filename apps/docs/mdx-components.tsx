import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from './components/component-preview';

/**
 * MDX component registry used by every docs page. Extend this with shared
 * documentation widgets (previews, live playgrounds, callouts) so that they
 * are available without explicit imports inside `.mdx` files.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    ...components,
  };
}
