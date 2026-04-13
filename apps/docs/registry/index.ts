import type { ComponentType } from 'react';
import AlertDefault from './alert/alert-default';
import AlertDestructive from './alert/alert-destructive';
import BadgeDefault from './badge/badge-default';
import BadgeVariants from './badge/badge-variants';
import ButtonDefault from './button/button-default';
import ButtonLoading from './button/button-loading';
import ButtonSizes from './button/button-sizes';
import ButtonVariants from './button/button-variants';
import ButtonWithIcon from './button/button-with-icon';
import CardDefault from './card/card-default';
import DialogDefault from './dialog/dialog-default';
import EmptyStateDefault from './empty-state/empty-state-default';
import InputDefault from './input/input-default';
import InputStates from './input/input-states';
import PageHeaderDefault from './page-header/page-header-default';
import TabsDefault from './tabs/tabs-default';
import TooltipDefault from './tooltip/tooltip-default';

interface RegistryEntry {
  Component: ComponentType;
  /** Folder under `registry/` that owns the example's `.tsx` file. */
  folder: string;
}

/**
 * Central map of inline documentation examples. Each key is a stable slug used
 * from MDX via `<ComponentPreview name="…" />`. The folder is declared
 * explicitly so that multi-word component names work correctly — do NOT
 * derive it from the slug. Add every new example here; dynamic globbed
 * imports are avoided so the bundler can tree-shake deterministically.
 */
export const registry: Record<string, RegistryEntry> = {
  'alert-default': { Component: AlertDefault, folder: 'alert' },
  'alert-destructive': { Component: AlertDestructive, folder: 'alert' },
  'badge-default': { Component: BadgeDefault, folder: 'badge' },
  'badge-variants': { Component: BadgeVariants, folder: 'badge' },
  'button-default': { Component: ButtonDefault, folder: 'button' },
  'button-variants': { Component: ButtonVariants, folder: 'button' },
  'button-sizes': { Component: ButtonSizes, folder: 'button' },
  'button-with-icon': { Component: ButtonWithIcon, folder: 'button' },
  'button-loading': { Component: ButtonLoading, folder: 'button' },
  'card-default': { Component: CardDefault, folder: 'card' },
  'dialog-default': { Component: DialogDefault, folder: 'dialog' },
  'empty-state-default': { Component: EmptyStateDefault, folder: 'empty-state' },
  'input-default': { Component: InputDefault, folder: 'input' },
  'input-states': { Component: InputStates, folder: 'input' },
  'page-header-default': { Component: PageHeaderDefault, folder: 'page-header' },
  'tabs-default': { Component: TabsDefault, folder: 'tabs' },
  'tooltip-default': { Component: TooltipDefault, folder: 'tooltip' },
};
