import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@uranus-workspace/design-system';
import { type ReactNode, useEffect } from 'react';

export interface SearchCommandItem {
  /** Stable id used as React key. */
  id: string;
  label: ReactNode;
  /** Decorative icon rendered before the label. */
  icon?: ReactNode;
  /** Pretty-printed shortcut, e.g. `"⌘D"`. */
  shortcut?: string;
  /** Keywords for fuzzy search beyond the label text. */
  keywords?: string[];
  /** Selection handler. The dialog closes automatically after `onSelect` runs. */
  onSelect: () => void;
}

export interface SearchCommandGroup {
  heading: ReactNode;
  items: SearchCommandItem[];
}

export interface SearchCommandProps {
  /** Whether the dialog is currently open. Owned by the consumer. */
  open: boolean;
  /** Open/close callback. */
  onOpenChange: (open: boolean) => void;
  /** Grouped command items. */
  groups: SearchCommandGroup[];
  /** Placeholder for the search input. Defaults to `"Type a command or search…"`. */
  placeholder?: string;
  /** Empty-state copy when nothing matches. Defaults to `"No results found."`. */
  emptyState?: ReactNode;
  /** Auto-bind `cmd+k` / `ctrl+k` to toggle. Defaults to `true`. */
  shortcutBinding?: boolean;
  /** Visually-hidden dialog title for screen readers. Defaults to `"Command palette"`. */
  ariaLabel?: string;
}

/**
 * Opinionated `cmd+k` palette over the design-system `command` primitive.
 *
 * Wraps `Command` inside a controlled `Dialog`, owns the `cmd+k`/`ctrl+k`
 * keyboard binding by default, and runs each item's `onSelect` then closes
 * the dialog. The component is controlled — pass `open`/`onOpenChange` from
 * the consumer.
 */
export function SearchCommand({
  open,
  onOpenChange,
  groups,
  placeholder = 'Type a command or search…',
  emptyState = 'No results found.',
  shortcutBinding = true,
  ariaLabel = 'Command palette',
}: SearchCommandProps) {
  useEffect(() => {
    if (!shortcutBinding) return;
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange, shortcutBinding]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <DialogTitle className="sr-only">{ariaLabel}</DialogTitle>
        <DialogDescription className="sr-only">
          Search through pages, settings, and quick actions.
        </DialogDescription>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyState}</CommandEmpty>
            {groups.map((group, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: groups are stable by position
                key={index}
              >
                {index > 0 ? <CommandSeparator /> : null}
                <CommandGroup heading={group.heading}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.id}
                      keywords={item.keywords}
                      onSelect={() => {
                        item.onSelect();
                        onOpenChange(false);
                      }}
                    >
                      {item.icon ? (
                        <span aria-hidden className="mr-2 inline-flex">
                          {item.icon}
                        </span>
                      ) : null}
                      <span>{item.label}</span>
                      {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
