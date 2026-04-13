import type { ComponentType } from 'react';
import AccordionDefault from './accordion/accordion-default';
import AccordionMultiple from './accordion/accordion-multiple';
import AlertDialogDefault from './alert-dialog/alert-dialog-default';
import AlertDialogDestructive from './alert-dialog/alert-dialog-destructive';
import AlertDefault from './alert/alert-default';
import AlertDestructive from './alert/alert-destructive';
import AspectRatioDefault from './aspect-ratio/aspect-ratio-default';
import AvatarDefault from './avatar/avatar-default';
import AvatarGroup from './avatar/avatar-group';
import BadgeDefault from './badge/badge-default';
import BadgeVariants from './badge/badge-variants';
import BreadcrumbDefault from './breadcrumb/breadcrumb-default';
import BreadcrumbEllipsisExample from './breadcrumb/breadcrumb-ellipsis';
import ButtonGroupDefault from './button-group/button-group-default';
import ButtonDefault from './button/button-default';
import ButtonLoading from './button/button-loading';
import ButtonSizes from './button/button-sizes';
import ButtonVariants from './button/button-variants';
import ButtonWithIcon from './button/button-with-icon';
import CalendarDefault from './calendar/calendar-default';
import CalendarRange from './calendar/calendar-range';
import CardDefault from './card/card-default';
import CarouselDefault from './carousel/carousel-default';
import CheckboxDefault from './checkbox/checkbox-default';
import CheckboxStates from './checkbox/checkbox-states';
import CollapsibleDefault from './collapsible/collapsible-default';
import CommandDefault from './command/command-default';
import ContextMenuDefault from './context-menu/context-menu-default';
import DialogDefault from './dialog/dialog-default';
import DrawerDefault from './drawer/drawer-default';
import DropdownMenuDefault from './dropdown-menu/dropdown-menu-default';
import EmptyStateDefault from './empty-state/empty-state-default';
import EmptyDefault from './empty/empty-default';
import FieldDefault from './field/field-default';
import FieldErrorExample from './field/field-error';
import FormDefault from './form/form-default';
import HoverCardDefault from './hover-card/hover-card-default';
import InputGroupButtonExample from './input-group/input-group-button';
import InputGroupDefault from './input-group/input-group-default';
import InputOtpDefault from './input-otp/input-otp-default';
import InputDefault from './input/input-default';
import InputStates from './input/input-states';
import KbdDefault from './kbd/kbd-default';
import LabelDefault from './label/label-default';
import MenubarDefault from './menubar/menubar-default';
import NavigationMenuDefault from './navigation-menu/navigation-menu-default';
import PageHeaderDefault from './page-header/page-header-default';
import PaginationDefault from './pagination/pagination-default';
import PopoverDefault from './popover/popover-default';
import PopoverForm from './popover/popover-form';
import ProgressDefault from './progress/progress-default';
import RadioGroupDefault from './radio-group/radio-group-default';
import RadioGroupHorizontal from './radio-group/radio-group-horizontal';
import ResizableDefault from './resizable/resizable-default';
import ScrollAreaDefault from './scroll-area/scroll-area-default';
import SelectDefault from './select/select-default';
import SeparatorDefault from './separator/separator-default';
import SheetDefault from './sheet/sheet-default';
import SheetLeft from './sheet/sheet-left';
import SidebarDefault from './sidebar/sidebar-default';
import SkeletonDefault from './skeleton/skeleton-default';
import SliderDefault from './slider/slider-default';
import SliderDisabled from './slider/slider-disabled';
import SonnerDefault from './sonner/sonner-default';
import SpinnerDefault from './spinner/spinner-default';
import SwitchDefault from './switch/switch-default';
import SwitchStates from './switch/switch-states';
import TableDefault from './table/table-default';
import TabsDefault from './tabs/tabs-default';
import TextareaDefault from './textarea/textarea-default';
import TextareaDisabled from './textarea/textarea-disabled';
import ToggleGroupDefault from './toggle-group/toggle-group-default';
import ToggleDefault from './toggle/toggle-default';
import ToggleOutline from './toggle/toggle-outline';
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
  'accordion-default': { Component: AccordionDefault, folder: 'accordion' },
  'accordion-multiple': { Component: AccordionMultiple, folder: 'accordion' },
  'alert-default': { Component: AlertDefault, folder: 'alert' },
  'alert-destructive': { Component: AlertDestructive, folder: 'alert' },
  'alert-dialog-default': { Component: AlertDialogDefault, folder: 'alert-dialog' },
  'alert-dialog-destructive': { Component: AlertDialogDestructive, folder: 'alert-dialog' },
  'aspect-ratio-default': { Component: AspectRatioDefault, folder: 'aspect-ratio' },
  'avatar-default': { Component: AvatarDefault, folder: 'avatar' },
  'avatar-group': { Component: AvatarGroup, folder: 'avatar' },
  'badge-default': { Component: BadgeDefault, folder: 'badge' },
  'badge-variants': { Component: BadgeVariants, folder: 'badge' },
  'breadcrumb-default': { Component: BreadcrumbDefault, folder: 'breadcrumb' },
  'breadcrumb-ellipsis': { Component: BreadcrumbEllipsisExample, folder: 'breadcrumb' },
  'button-default': { Component: ButtonDefault, folder: 'button' },
  'button-group-default': { Component: ButtonGroupDefault, folder: 'button-group' },
  'button-variants': { Component: ButtonVariants, folder: 'button' },
  'button-sizes': { Component: ButtonSizes, folder: 'button' },
  'button-with-icon': { Component: ButtonWithIcon, folder: 'button' },
  'button-loading': { Component: ButtonLoading, folder: 'button' },
  'calendar-default': { Component: CalendarDefault, folder: 'calendar' },
  'calendar-range': { Component: CalendarRange, folder: 'calendar' },
  'card-default': { Component: CardDefault, folder: 'card' },
  'carousel-default': { Component: CarouselDefault, folder: 'carousel' },
  'checkbox-default': { Component: CheckboxDefault, folder: 'checkbox' },
  'checkbox-states': { Component: CheckboxStates, folder: 'checkbox' },
  'collapsible-default': { Component: CollapsibleDefault, folder: 'collapsible' },
  'command-default': { Component: CommandDefault, folder: 'command' },
  'context-menu-default': { Component: ContextMenuDefault, folder: 'context-menu' },
  'dialog-default': { Component: DialogDefault, folder: 'dialog' },
  'drawer-default': { Component: DrawerDefault, folder: 'drawer' },
  'dropdown-menu-default': { Component: DropdownMenuDefault, folder: 'dropdown-menu' },
  'empty-default': { Component: EmptyDefault, folder: 'empty' },
  'empty-state-default': { Component: EmptyStateDefault, folder: 'empty-state' },
  'field-default': { Component: FieldDefault, folder: 'field' },
  'field-error': { Component: FieldErrorExample, folder: 'field' },
  'form-default': { Component: FormDefault, folder: 'form' },
  'hover-card-default': { Component: HoverCardDefault, folder: 'hover-card' },
  'input-default': { Component: InputDefault, folder: 'input' },
  'input-group-default': { Component: InputGroupDefault, folder: 'input-group' },
  'input-group-button': { Component: InputGroupButtonExample, folder: 'input-group' },
  'input-otp-default': { Component: InputOtpDefault, folder: 'input-otp' },
  'input-states': { Component: InputStates, folder: 'input' },
  'kbd-default': { Component: KbdDefault, folder: 'kbd' },
  'label-default': { Component: LabelDefault, folder: 'label' },
  'menubar-default': { Component: MenubarDefault, folder: 'menubar' },
  'navigation-menu-default': { Component: NavigationMenuDefault, folder: 'navigation-menu' },
  'page-header-default': { Component: PageHeaderDefault, folder: 'page-header' },
  'pagination-default': { Component: PaginationDefault, folder: 'pagination' },
  'popover-default': { Component: PopoverDefault, folder: 'popover' },
  'popover-form': { Component: PopoverForm, folder: 'popover' },
  'progress-default': { Component: ProgressDefault, folder: 'progress' },
  'radio-group-default': { Component: RadioGroupDefault, folder: 'radio-group' },
  'radio-group-horizontal': { Component: RadioGroupHorizontal, folder: 'radio-group' },
  'resizable-default': { Component: ResizableDefault, folder: 'resizable' },
  'scroll-area-default': { Component: ScrollAreaDefault, folder: 'scroll-area' },
  'select-default': { Component: SelectDefault, folder: 'select' },
  'separator-default': { Component: SeparatorDefault, folder: 'separator' },
  'sheet-default': { Component: SheetDefault, folder: 'sheet' },
  'sheet-left': { Component: SheetLeft, folder: 'sheet' },
  'sidebar-default': { Component: SidebarDefault, folder: 'sidebar' },
  'skeleton-default': { Component: SkeletonDefault, folder: 'skeleton' },
  'slider-default': { Component: SliderDefault, folder: 'slider' },
  'slider-disabled': { Component: SliderDisabled, folder: 'slider' },
  'sonner-default': { Component: SonnerDefault, folder: 'sonner' },
  'spinner-default': { Component: SpinnerDefault, folder: 'spinner' },
  'switch-default': { Component: SwitchDefault, folder: 'switch' },
  'switch-states': { Component: SwitchStates, folder: 'switch' },
  'table-default': { Component: TableDefault, folder: 'table' },
  'tabs-default': { Component: TabsDefault, folder: 'tabs' },
  'textarea-default': { Component: TextareaDefault, folder: 'textarea' },
  'textarea-disabled': { Component: TextareaDisabled, folder: 'textarea' },
  'toggle-default': { Component: ToggleDefault, folder: 'toggle' },
  'toggle-group-default': { Component: ToggleGroupDefault, folder: 'toggle-group' },
  'toggle-outline': { Component: ToggleOutline, folder: 'toggle' },
  'tooltip-default': { Component: TooltipDefault, folder: 'tooltip' },
};
