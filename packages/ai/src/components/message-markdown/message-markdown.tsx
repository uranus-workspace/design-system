import {
  type ComponentProps,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  forwardRef,
  isValidElement,
} from 'react';
import { cn } from '../../lib/cn.js';
import { CodeBlock } from '../code-block/code-block.js';

type MarkdownComponentType = (props: {
  children: string;
  components: Record<string, unknown>;
  remarkPlugins?: unknown[];
}) => ReactElement | null;

export interface MessageMarkdownProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  /**
   * Pass `react-markdown`'s default export (or any compatible renderer) from
   * the consumer. We type it as `unknown` to keep `react-markdown` an optional
   * peer dependency without forcing its types into the public API.
   */
  markdownComponent: unknown;
  /** `[remarkGfm]` — pass through to `remark-gfm`. */
  remarkPlugins?: unknown[];
}

interface MdxCodeProps extends ComponentProps<'code'> {
  inline?: boolean;
}

function isInlineCode(props: MdxCodeProps): boolean {
  if (props.inline) return true;
  const className = typeof props.className === 'string' ? props.className : '';
  if (className.includes('language-')) return false;
  return typeof props.children === 'string' && !props.children.includes('\n');
}

/**
 * Renders assistant markdown using a consumer-supplied `react-markdown` instance.
 * The package keeps `react-markdown` as an **optional** peer to avoid forcing it
 * on consumers that render plain text. Wire it once at the call site:
 *
 * ```tsx
 * import ReactMarkdown from 'react-markdown';
 * import remarkGfm from 'remark-gfm';
 *
 * <MessageMarkdown markdownComponent={ReactMarkdown} remarkPlugins={[remarkGfm]}>
 *   {text}
 * </MessageMarkdown>
 * ```
 */
export const MessageMarkdown = forwardRef<HTMLDivElement, MessageMarkdownProps>(
  function MessageMarkdown(
    { children, markdownComponent, remarkPlugins, className, ...props },
    ref,
  ) {
    const Markdown = markdownComponent as MarkdownComponentType;
    const components: Record<string, unknown> = {
      pre: ({ children: preChildren }: { children?: ReactNode }) => {
        const child = isValidElement(preChildren)
          ? (preChildren as ReactElement<{ className?: string; children?: ReactNode }>)
          : null;
        const className = child?.props?.className ?? '';
        const language =
          typeof className === 'string' ? className.replace('language-', '').trim() : undefined;
        const code =
          typeof child?.props?.children === 'string'
            ? child.props.children
            : Array.isArray(child?.props?.children)
              ? child.props.children.join('')
              : '';
        return <CodeBlock code={code.replace(/\n$/, '')} language={language || undefined} />;
      },
      code: (codeProps: MdxCodeProps) => {
        if (isInlineCode(codeProps)) {
          return (
            <code
              className={cn(
                'rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground',
                codeProps.className,
              )}
            >
              {codeProps.children}
            </code>
          );
        }
        return <code className={codeProps.className}>{codeProps.children}</code>;
      },
      a: (anchorProps: ComponentProps<'a'>) => (
        <a
          {...anchorProps}
          className={cn(
            'font-medium text-primary underline underline-offset-2 hover:text-primary/80',
            anchorProps.className,
          )}
          target={anchorProps.target ?? '_blank'}
          rel={anchorProps.rel ?? 'noreferrer'}
        />
      ),
    };

    return (
      <div
        ref={ref}
        data-slot="message-markdown"
        className={cn(
          'prose prose-sm prose-neutral max-w-none',
          'prose-p:my-2 prose-headings:mb-2 prose-headings:mt-4 prose-li:my-0.5',
          'prose-code:before:content-none prose-code:after:content-none',
          'dark:prose-invert',
          className,
        )}
        {...props}
      >
        <Markdown components={components} remarkPlugins={remarkPlugins}>
          {children}
        </Markdown>
      </div>
    );
  },
);
