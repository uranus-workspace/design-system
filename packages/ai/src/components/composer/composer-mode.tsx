import { ToggleGroup, ToggleGroupItem } from '@uranus-workspace/design-system';
import { Compass, MessageSquare, Telescope } from 'lucide-react';
import { type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import type { UranusChatMode } from '../../types.js';
import { useComposer } from './context.js';

interface ModeOption {
  value: UranusChatMode;
  label: string;
  icon: ReactNode;
  description?: string;
}

const DEFAULT_OPTIONS: ModeOption[] = [
  {
    value: 'chat',
    label: 'Agente',
    icon: <MessageSquare aria-hidden className="size-3.5" />,
    description: 'Resposta direta',
  },
  {
    value: 'plan',
    label: 'Plano',
    icon: <Compass aria-hidden className="size-3.5" />,
    description: 'Quebra em passos',
  },
  {
    value: 'research',
    label: 'Pesquisa',
    icon: <Telescope aria-hidden className="size-3.5" />,
    description: 'Busca em fontes',
  },
];

export interface ComposerModeToggleProps {
  /** Override the default `chat | plan | research` set. */
  options?: ModeOption[];
  className?: string;
}

export const ComposerModeToggle = forwardRef<HTMLDivElement, ComposerModeToggleProps>(
  function ComposerModeToggle({ options = DEFAULT_OPTIONS, className }, ref) {
    const { mode, setMode, busy, disabled } = useComposer();

    return (
      <ToggleGroup
        ref={ref}
        type="single"
        value={mode}
        onValueChange={(value) => {
          if (!value) return;
          setMode(value as UranusChatMode);
        }}
        disabled={disabled || busy}
        data-slot="composer-mode-toggle"
        className={cn(
          'rounded-xl border border-border/50 bg-muted/25 p-0.5 shadow-none [&>button]:h-8 [&>button]:rounded-lg [&>button]:px-2.5 [&>button]:text-xs [&>button]:font-medium [&>button]:shadow-none',
          className,
        )}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            aria-label={
              option.description ? `${option.label}: ${option.description}` : option.label
            }
            className="gap-1"
          >
            {option.icon}
            <span>{option.label}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  },
);
