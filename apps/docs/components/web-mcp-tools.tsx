'use client';

import { getSiteUrl } from '@/lib/site';
import { useEffect } from 'react';

type ToolExecute = (args: Record<string, unknown>) => Promise<unknown>;

type RegisterToolFn = (
  definition: {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    execute: ToolExecute;
  },
  options?: { signal?: AbortSignal },
) => void;

type ModelContextApi = {
  registerTool: RegisterToolFn;
};

function getModelContext(): ModelContextApi | undefined {
  if (typeof navigator === 'undefined') {
    return undefined;
  }
  return (navigator as Navigator & { modelContext?: ModelContextApi }).modelContext;
}

/**
 * Registers WebMCP tools when `navigator.modelContext` is available (Chrome WebMEP / agent browsers).
 */
export function WebMcpTools() {
  useEffect(() => {
    const mc = getModelContext();
    if (!mc?.registerTool) {
      return;
    }

    const ac = new AbortController();
    const { signal } = ac;
    const base = getSiteUrl();

    mc.registerTool(
      {
        name: 'uranus_get_site_base_url',
        description:
          'Return the canonical base URL of the Uranus Design System documentation site.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        async execute() {
          return { baseUrl: base };
        },
      },
      { signal },
    );

    mc.registerTool(
      {
        name: 'uranus_open_llms_index',
        description: 'Navigate the browser to llms.txt (compact documentation index for LLMs).',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        async execute() {
          const url = `${window.location.origin}/llms.txt`;
          window.location.assign(url);
          return { navigatedTo: url };
        },
      },
      { signal },
    );

    mc.registerTool(
      {
        name: 'uranus_open_docs_path',
        description:
          'Navigate to a documentation path under /docs. Pass a path like "components/button" (no leading slash).',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Slug path under /docs, e.g. components/button',
            },
          },
          required: ['path'],
          additionalProperties: false,
        },
        async execute(args) {
          const raw = (args as { path?: string }).path ?? '';
          const path = String(raw).replace(/^\/+/, '');
          const url = `${window.location.origin}/docs/${path}`;
          window.location.assign(url);
          return { navigatedTo: url };
        },
      },
      { signal },
    );

    return () => {
      ac.abort();
    };
  }, []);

  return null;
}
