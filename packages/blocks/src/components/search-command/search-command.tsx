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
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
} from 'react';

export interface SearchCommandItemConfig {
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

export interface SearchCommandGroupConfig {
  heading: ReactNode;
  items: SearchCommandItemConfig[];
}

export interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Legacy: grouped command items.
   * Omit when composing with `SearchCommand.Group` and `SearchCommand.Item` as `children` of the list region.
   */
  groups?: SearchCommandGroupConfig[];
  /**
   * Compositional list body (inside `CommandList`, after `CommandEmpty`).
   * Used when `groups` is omitted.
   */
  children?: ReactNode;
  placeholder?: string;
  emptyState?: ReactNode;
  shortcutBinding?: boolean;
  ariaLabel?: string;
}

const SearchCommandContext = createContext<{ close: () => void } | null>(null);

function SearchCommandLegacyList({
  groups,
  onOpenChange,
}: {
  groups: SearchCommandGroupConfig[];
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <>
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
    </>
  );
}

export type SearchCommandGroupProps = ComponentPropsWithoutRef<typeof CommandGroup>;

export const SearchCommandGroup = forwardRef<
  ElementRef<typeof CommandGroup>,
  SearchCommandGroupProps
>(function SearchCommandGroup(props, ref) {
  return <CommandGroup ref={ref} {...props} />;
});

export type SearchCommandItemSlotProps = Omit<
  ComponentPropsWithoutRef<typeof CommandItem>,
  'onSelect'
> & {
  onSelect?: () => void;
  shortcut?: string;
  icon?: ReactNode;
};

export const SearchCommandItem = forwardRef<
  ElementRef<typeof CommandItem>,
  SearchCommandItemSlotProps
>(function SearchCommandItem(
  { onSelect, shortcut, icon, children, className, ...props },
  ref,
) {
  const ctx = useContext(SearchCommandContext);
  if (!ctx) {
    throw new Error('SearchCommand.Item must be used within SearchCommand');
  }
  return (
    <CommandItem
      ref={ref}
      className={className}
      {...props}
      onSelect={() => {
        onSelect?.();
        ctx.close();
      }}
    >
      {icon ? (
        <span aria-hidden className="mr-2 inline-flex">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {shortcut ? <CommandShortcut>{shortcut}</CommandShortcut> : null}
    </CommandItem>
  );
});

SearchCommandGroup.displayName = 'SearchCommand.Group';
SearchCommandItem.displayName = 'SearchCommand.Item';

const commandClassName =
  '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5';

function SearchCommandRoot({
  open,
  onOpenChange,
  groups,
  children,
  placeholder = 'Type a command or search…',
  emptyState = 'No results found.',
  shortcutBinding = true,
  ariaLabel = 'Command palette',
}: SearchCommandProps) {
  const legacyLayout = groups !== undefined;
  const close = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

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
        <SearchCommandContext.Provider value={{ close }}>
          <Command className={commandClassName}>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{emptyState}</CommandEmpty>
              {legacyLayout ? (
                <SearchCommandLegacyList groups={groups} onOpenChange={onOpenChange} />
              ) : (
                children
              )}
            </CommandList>
          </Command>
        </SearchCommandContext.Provider>
      </DialogContent>
    </Dialog>
  );
}

SearchCommandRoot.displayName = 'SearchCommand';

/**
 * Controlled ⌘K command palette. Pass **`groups`** for a static shape, or omit
 * **`groups`** and render **`SearchCommand.Group`** / **`SearchCommand.Item`** as children.
 */
export const SearchCommand = Object.assign(SearchCommandRoot, {
  Group: SearchCommandGroup,
  Item: SearchCommandItem,
});
