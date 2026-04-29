import { Button } from '@uranus-workspace/design-system';
import { Check, Copy } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef, useCallback, useState } from 'react';
import { cn } from '../../lib/cn.js';

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Source code to display. */
  code: string;
  /** Language label shown in the toolbar. */
  language?: string;
  /** Render the code body (e.g. shiki/prism output). When omitted we render a plain `<pre><code>`. */
  renderCode?: (code: string) => ReactNode;
  /** Hide the copy button. */
  hideCopy?: boolean;
}

/**
 * Code block with a top-bar (language label + copy button). Bring-your-own
 * syntax highlighter via `renderCode` — shadcn/uranus does not bundle one.
 */
export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  { code, language, renderCode, hideCopy, className, ...props },
  ref,
) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div
      ref={ref}
      data-slot="code-block"
      className={cn(
        'group/code my-2 overflow-hidden rounded-md border bg-muted/40 text-sm text-foreground',
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b bg-muted/60 px-3 py-1.5">
        <span
          data-slot="code-block-language"
          className="font-mono text-xs uppercase tracking-wide text-muted-foreground"
        >
          {language ?? 'plaintext'}
        </span>
        {hideCopy ? null : (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 gap-1.5 px-2 text-xs"
            onClick={onCopy}
            aria-label={copied ? 'Copiado' : 'Copiar código'}
          >
            {copied ? (
              <Check aria-hidden className="size-3.5" />
            ) : (
              <Copy aria-hidden className="size-3.5" />
            )}
            {copied ? 'Copiado' : 'Copiar'}
          </Button>
        )}
      </div>
      <div className="overflow-x-auto p-3">
        {renderCode ? (
          renderCode(code)
        ) : (
          <pre className="font-mono text-xs leading-relaxed">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
});
