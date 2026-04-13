import type { ComponentType } from 'react';
import AlertDefault from './alert/alert-default';
import AlertDestructive from './alert/alert-destructive';
import AlertDialogDefault from './alert-dialog/alert-dialog-default';
import AlertDialogDestructive from './alert-dialog/alert-dialog-destructive';
import BadgeDefault from './badge/badge-default';
import BadgeVariants from './badge/badge-variants';
import ButtonDefault from './button/button-default';
import ButtonLoading from './button/button-loading';
import ButtonSizes from './button/button-sizes';
import ButtonVariants from './button/button-variants';
import ButtonWithIcon from './button/button-with-icon';
import CardDefault from './card/card-default';
import CheckboxDefault from './checkbox/checkbox-default';
import CheckboxStates from './checkbox/checkbox-states';
import CommandDefault from './command/command-default';
import ContextMenuDefault from './context-menu/context-menu-default';
import DialogDefault from './dialog/dialog-default';
import DrawerDefault from './drawer/drawer-default';
import DropdownMenuDefault from './dropdown-menu/dropdown-menu-default';
import EmptyStateDefault from './empty-state/empty-state-default';
import FieldDefault from './field/field-default';
import FieldErrorExample from './field/field-error';
import HoverCardDefault from './hover-card/hover-card-default';
import InputDefault from './input/input-default';
import InputGroupButtonExample from './input-group/input-group-button';
import InputGroupDefault from './input-group/input-group-default';
import InputOtpDefault from './input-otp/input-otp-default';
import InputStates from './input/input-states';
import LabelDefault from './label/label-default';
import MenubarDefault from './menubar/menubar-default';
import NavigationMenuDefault from './navigation-menu/navigation-menu-default';
import PageHeaderDefault from './page-header/page-header-default';
import PopoverDefault from './popover/popover-default';
import PopoverForm from './popover/popover-form';
import RadioGroupDefault from './radio-group/radio-group-default';
import RadioGroupHorizontal from './radio-group/radio-group-horizontal';
import SelectDefault from './select/select-default';
import SheetDefault from './sheet/sheet-default';
import SheetLeft from './sheet/sheet-left';
import SliderDefault from './slider/slider-default';
import SliderDisabled from './slider/slider-disabled';
import SwitchDefault from './switch/switch-default';
import SwitchStates from './switch/switch-states';
import TabsDefault from './tabs/tabs-default';
import TextareaDefault from './textarea/textarea-default';
import TextareaDisabled from './textarea/textarea-disabled';
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
  'alert-dialog-default': { Component: AlertDialogDefault, folder: 'alert-dialog' },
  'alert-dialog-destructive': { Component: AlertDialogDestructive, folder: 'alert-dialog' },
  'badge-default': { Component: BadgeDefault, folder: 'badge' },
  'badge-variants': { Component: BadgeVariants, folder: 'badge' },
  'button-default': { Component: ButtonDefault, folder: 'button' },
  'button-variants': { Component: ButtonVariants, folder: 'button' },
  'button-sizes': { Component: ButtonSizes, folder: 'button' },
  'button-with-icon': { Component: ButtonWithIcon, folder: 'button' },
  'button-loading': { Component: ButtonLoading, folder: 'button' },
  'card-default': { Component: CardDefault, folder: 'card' },
  'checkbox-default': { Component: CheckboxDefault, folder: 'checkbox' },
  'checkbox-states': { Component: CheckboxStates, folder: 'checkbox' },
  'command-default': { Component: CommandDefault, folder: 'command' },
  'context-menu-default': { Component: ContextMenuDefault, folder: 'context-menu' },
  'dialog-default': { Component: DialogDefault, folder: 'dialog' },
  'drawer-default': { Component: DrawerDefault, folder: 'drawer' },
  'dropdown-menu-default': { Component: DropdownMenuDefault, folder: 'dropdown-menu' },
  'empty-state-default': { Component: EmptyStateDefault, folder: 'empty-state' },
  'field-default': { Component: FieldDefault, folder: 'field' },
  'field-error': { Component: FieldErrorExample, folder: 'field' },
  'hover-card-default': { Component: HoverCardDefault, folder: 'hover-card' },
  'input-default': { Component: InputDefault, folder: 'input' },
  'input-group-default': { Component: InputGroupDefault, folder: 'input-group' },
  'input-group-button': { Component: InputGroupButtonExample, folder: 'input-group' },
  'input-otp-default': { Component: InputOtpDefault, folder: 'input-otp' },
  'input-states': { Component: InputStates, folder: 'input' },
  'label-default': { Component: LabelDefault, folder: 'label' },
  'menubar-default': { Component: MenubarDefault, folder: 'menubar' },
  'navigation-menu-default': { Component: NavigationMenuDefault, folder: 'navigation-menu' },
  'page-header-default': { Component: PageHeaderDefault, folder: 'page-header' },
  'popover-default': { Component: PopoverDefault, folder: 'popover' },
  'popover-form': { Component: PopoverForm, folder: 'popover' },
  'radio-group-default': { Component: RadioGroupDefault, folder: 'radio-group' },
  'radio-group-horizontal': { Component: RadioGroupHorizontal, folder: 'radio-group' },
  'select-default': { Component: SelectDefault, folder: 'select' },
  'sheet-default': { Component: SheetDefault, folder: 'sheet' },
  'sheet-left': { Component: SheetLeft, folder: 'sheet' },
  'slider-default': { Component: SliderDefault, folder: 'slider' },
  'slider-disabled': { Component: SliderDisabled, folder: 'slider' },
  'switch-default': { Component: SwitchDefault, folder: 'switch' },
  'switch-states': { Component: SwitchStates, folder: 'switch' },
  'tabs-default': { Component: TabsDefault, folder: 'tabs' },
  'textarea-default': { Component: TextareaDefault, folder: 'textarea' },
  'textarea-disabled': { Component: TextareaDisabled, folder: 'textarea' },
  'tooltip-default': { Component: TooltipDefault, folder: 'tooltip' },
};
