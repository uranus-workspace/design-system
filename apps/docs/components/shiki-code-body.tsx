'use client';

import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import type { ReactNode } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import type { Highlighter } from 'shiki';

const THEME = 'github-dark';

/** Labels aceitos em `CodeBlock`/`language` → IDs gramática Shiki. */
const LANG_MAP: Record<string, string> = {
  bash: 'bash',
  cjs: 'javascript',
  css: 'css',
  html: 'html',
  js: 'javascript',
  jsx: 'jsx',
  json: 'json',
  jsonc: 'jsonc',
  md: 'markdown',
  markdown: 'markdown',
  mjs: 'javascript',
  plaintext: 'plaintext',
  py: 'python',
  python: 'python',
  rb: 'ruby',
  ruby: 'ruby',
  scss: 'scss',
  sh: 'bash',
  shell: 'bash',
  sql: 'sql',
  postgres: 'sql',
  postgresql: 'sql',
  text: 'plaintext',
  ts: 'typescript',
  tsx: 'tsx',
  txt: 'plaintext',
  vue: 'vue',
  yaml: 'yaml',
  yml: 'yaml',
  zsh: 'bash',
};

const BUNDLED_LANGS = [
  'typescript',
  'tsx',
  'javascript',
  'jsx',
  'json',
  'jsonc',
  'sql',
  'markdown',
  'yaml',
  'bash',
  'python',
  'ruby',
  'html',
  'css',
  'scss',
  'vue',
  'plaintext',
] as const;

let highlighterPromise: Promise<Highlighter> | null = null;

function loadHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: [THEME],
        langs: [...BUNDLED_LANGS],
      }),
    );
  }
  return highlighterPromise;
}

function toShikiLang(label: string | undefined): string {
  const key = (label ?? 'plaintext').toLowerCase().trim();
  return LANG_MAP[key] ?? key;
}

export interface ShikiCodeBodyProps {
  code: string;
  /** Mesmo valor que `language` no `CodeBlock` (`ts`, `json`, `sql`, …). */
  language?: string;
}

export function ShikiCodeBody({ code, language }: ShikiCodeBodyProps) {
  const [tree, setTree] = useState<ReactNode>(null);

  useEffect(() => {
    let cancelled = false;
    const lang = toShikiLang(language);

    void loadHighlighter().then((highlighter) => {
      const render = (resolvedLang: string) =>
        highlighter.codeToHast(code, {
          lang: resolvedLang,
          theme: THEME,
        });

      try {
        const hast = render(lang);
        const jsxTree = toJsxRuntime(hast, {
          Fragment,
          jsx,
          jsxs,
          elementAttributeNameCase: 'react',
        });
        if (!cancelled) setTree(jsxTree);
      } catch {
        try {
          const hast = render('plaintext');
          const jsxTree = toJsxRuntime(hast, {
            Fragment,
            jsx,
            jsxs,
            elementAttributeNameCase: 'react',
          });
          if (!cancelled) setTree(jsxTree);
        } catch {
          if (!cancelled) setTree(null);
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  if (tree === null) {
    return (
      <pre className="font-mono text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div className="[&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:p-0 [&_pre]:leading-relaxed [&_code]:font-mono [&_.line]:leading-relaxed">
      {tree}
    </div>
  );
}
