import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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

export interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Compose with `SearchCommand.Group` and `SearchCommand.Item` as children. */
  children?: ReactNode;
  placeholder?: string;
  emptyState?: ReactNode;
  shortcutBinding?: boolean;
  ariaLabel?: string;
}

const SearchCommandContext = createContext<{ close: () => void } | null>(null);

export type SearchCommandGroupProps = ComponentPropsWithoutRef<typeof CommandGroup>;

export const SearchCommandGroup = forwardRef<
  ElementRef<typeof CommandGroup>,
  SearchCommandGroupProps
>(function SearchCommandGroup(props, ref) {
  return <CommandGroup ref={ref} {...props} />;
});

export type SearchCommandItemProps = Omit<
  ComponentPropsWithoutRef<typeof CommandItem>,
  'onSelect'
> & {
  onSelect?: () => void;
  shortcut?: string;
  icon?: ReactNode;
};

export const SearchCommandItem = forwardRef<ElementRef<typeof CommandItem>, SearchCommandItemProps>(
  function SearchCommandItem({ onSelect, shortcut, icon, children, className, ...props }, ref) {
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
  },
);

SearchCommandGroup.displayName = 'SearchCommand.Group';
SearchCommandItem.displayName = 'SearchCommand.Item';

const commandClassName =
  '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5';

function SearchCommandRoot({
  open,
  onOpenChange,
  children,
  placeholder = 'Digite um comando ou busque…',
  emptyState = 'Nenhum resultado.',
  shortcutBinding = true,
  ariaLabel = 'Paleta de comandos',
}: SearchCommandProps) {
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
          Busque por páginas, configurações e ações rápidas.
        </DialogDescription>
        <SearchCommandContext.Provider value={{ close }}>
          <Command className={commandClassName}>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{emptyState}</CommandEmpty>
              {children}
            </CommandList>
          </Command>
        </SearchCommandContext.Provider>
      </DialogContent>
    </Dialog>
  );
}

SearchCommandRoot.displayName = 'SearchCommand';

/**
 * Controlled ⌘K command palette. Compose with **`SearchCommand.Group`** and
 * **`SearchCommand.Item`** as children.
 */
export const SearchCommand = Object.assign(SearchCommandRoot, {
  Group: SearchCommandGroup,
  Item: SearchCommandItem,
});
