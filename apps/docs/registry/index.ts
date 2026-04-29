import type { ComponentType } from 'react';
import AccordionDefault from './accordion/accordion-default';
import AccordionMultiple from './accordion/accordion-multiple';
import ChatDefault from './ai/chat-default';
import ChatThreadListDefault from './ai/chat-thread-list-default';
import CitationDefault from './ai/citation-default';
import CodeBlockDefault from './ai/code-block-default';
import ComposerDefault from './ai/composer-default';
import MessageDefault from './ai/message-default';
import MessageListDefault from './ai/message-list-default';
import MessageMarkdownDefault from './ai/message-markdown-default';
import PlanPanelDefault from './ai/plan-panel-default';
import ReasoningPanelDefault from './ai/reasoning-panel-default';
import ResearchPanelDefault from './ai/research-panel-default';
import SearchingIndicatorDefault from './ai/searching-indicator-default';
import StageListDefault from './ai/stage-list-default';
import StreamingTextDefault from './ai/streaming-text-default';
import SuggestedPromptsDefault from './ai/suggested-prompts-default';
import ThinkingIndicatorDefault from './ai/thinking-indicator-default';
import ToolCallCardDefault from './ai/tool-call-card-default';
import UseAudioRecorderDefault from './ai/use-audio-recorder-default';
import UseUranusChatDefault from './ai/use-uranus-chat-default';
import AlertDialogDefault from './alert-dialog/alert-dialog-default';
import AlertDialogDestructive from './alert-dialog/alert-dialog-destructive';
import AlertDefault from './alert/alert-default';
import AlertDestructive from './alert/alert-destructive';
import AspectRatioDefault from './aspect-ratio/aspect-ratio-default';
import AvatarDefault from './avatar/avatar-default';
import AvatarGroup from './avatar/avatar-group';
import BadgeDefault from './badge/badge-default';
import BadgeVariants from './badge/badge-variants';
import ActivityFeedDefault from './blocks/activity-feed-default';
import AnnouncementBannerDefault from './blocks/announcement-banner-default';
import AppHeaderDefault from './blocks/app-header-default';
import AppShellDefault from './blocks/app-shell-default';
import AppSidebarDefault from './blocks/app-sidebar-default';
import AuthLayoutDefault from './blocks/auth-layout-default';
import ChartCardDefault from './blocks/chart-card-default';
import ConfirmDialogDefault from './blocks/confirm-dialog-default';
import CTASectionDefault from './blocks/cta-section-default';
import DangerConfirmDialogDefault from './blocks/danger-confirm-dialog-default';
import DataTableDefault from './blocks/data-table-default';
import DetailDrawerDefault from './blocks/detail-drawer-default';
import ErrorStateDefault from './blocks/error-state-default';
import FeatureGridDefault from './blocks/feature-grid-default';
import FilterBarDefault from './blocks/filter-bar-default';
import ForgotPasswordFormDefault from './blocks/forgot-password-form-default';
import FormSectionDefault from './blocks/form-section-default';
import HeroDefault from './blocks/hero-default';
import NotificationListDefault from './blocks/notification-list-default';
import OnboardingChecklistDefault from './blocks/onboarding-checklist-default';
import OtpVerificationFormDefault from './blocks/otp-verification-form-default';
import ResetPasswordFormDefault from './blocks/reset-password-form-default';
import SearchCommandDefault from './blocks/search-command-default';
import SettingsLayoutDefault from './blocks/settings-layout-default';
import SignInFormDefault from './blocks/sign-in-form-default';
import SignUpFormDefault from './blocks/sign-up-form-default';
import StatCardDefault from './blocks/stat-card-default';
import StatGridDefault from './blocks/stat-grid-default';
import UpgradePromptDefault from './blocks/upgrade-prompt-default';
import UsageCardDefault from './blocks/usage-card-default';
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
  'chat-default': { Component: ChatDefault, folder: 'ai' },
  'chat-thread-list-default': { Component: ChatThreadListDefault, folder: 'ai' },
  'citation-default': { Component: CitationDefault, folder: 'ai' },
  'code-block-default': { Component: CodeBlockDefault, folder: 'ai' },
  'composer-default': { Component: ComposerDefault, folder: 'ai' },
  'message-default': { Component: MessageDefault, folder: 'ai' },
  'message-list-default': { Component: MessageListDefault, folder: 'ai' },
  'message-markdown-default': { Component: MessageMarkdownDefault, folder: 'ai' },
  'plan-panel-default': { Component: PlanPanelDefault, folder: 'ai' },
  'reasoning-panel-default': { Component: ReasoningPanelDefault, folder: 'ai' },
  'research-panel-default': { Component: ResearchPanelDefault, folder: 'ai' },
  'searching-indicator-default': { Component: SearchingIndicatorDefault, folder: 'ai' },
  'stage-list-default': { Component: StageListDefault, folder: 'ai' },
  'streaming-text-default': { Component: StreamingTextDefault, folder: 'ai' },
  'suggested-prompts-default': { Component: SuggestedPromptsDefault, folder: 'ai' },
  'thinking-indicator-default': { Component: ThinkingIndicatorDefault, folder: 'ai' },
  'tool-call-card-default': { Component: ToolCallCardDefault, folder: 'ai' },
  'use-audio-recorder-default': { Component: UseAudioRecorderDefault, folder: 'ai' },
  'use-uranus-chat-default': { Component: UseUranusChatDefault, folder: 'ai' },
  'accordion-multiple': { Component: AccordionMultiple, folder: 'accordion' },
  'activity-feed-default': { Component: ActivityFeedDefault, folder: 'blocks' },
  'announcement-banner-default': { Component: AnnouncementBannerDefault, folder: 'blocks' },
  'app-header-default': { Component: AppHeaderDefault, folder: 'blocks' },
  'app-shell-default': { Component: AppShellDefault, folder: 'blocks' },
  'app-sidebar-default': { Component: AppSidebarDefault, folder: 'blocks' },
  'auth-layout-default': { Component: AuthLayoutDefault, folder: 'blocks' },
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
  'chart-card-default': { Component: ChartCardDefault, folder: 'blocks' },
  'checkbox-default': { Component: CheckboxDefault, folder: 'checkbox' },
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
  'confirm-dialog-default': { Component: ConfirmDialogDefault, folder: 'blocks' },
  'cta-section-default': { Component: CTASectionDefault, folder: 'blocks' },
  'danger-confirm-dialog-default': { Component: DangerConfirmDialogDefault, folder: 'blocks' },
  'data-table-default': { Component: DataTableDefault, folder: 'blocks' },
  'detail-drawer-default': { Component: DetailDrawerDefault, folder: 'blocks' },
  'error-state-default': { Component: ErrorStateDefault, folder: 'blocks' },
  'feature-grid-default': { Component: FeatureGridDefault, folder: 'blocks' },
  'filter-bar-default': { Component: FilterBarDefault, folder: 'blocks' },
  'forgot-password-form-default': { Component: ForgotPasswordFormDefault, folder: 'blocks' },
  'form-section-default': { Component: FormSectionDefault, folder: 'blocks' },
  'hero-default': { Component: HeroDefault, folder: 'blocks' },
  'notification-list-default': { Component: NotificationListDefault, folder: 'blocks' },
  'onboarding-checklist-default': { Component: OnboardingChecklistDefault, folder: 'blocks' },
  'otp-verification-form-default': { Component: OtpVerificationFormDefault, folder: 'blocks' },
  'reset-password-form-default': { Component: ResetPasswordFormDefault, folder: 'blocks' },
  'search-command-default': { Component: SearchCommandDefault, folder: 'blocks' },
  'settings-layout-default': { Component: SettingsLayoutDefault, folder: 'blocks' },
  'sign-in-form-default': { Component: SignInFormDefault, folder: 'blocks' },
  'sign-up-form-default': { Component: SignUpFormDefault, folder: 'blocks' },
  'stat-card-default': { Component: StatCardDefault, folder: 'blocks' },
  'stat-grid-default': { Component: StatGridDefault, folder: 'blocks' },
  'upgrade-prompt-default': { Component: UpgradePromptDefault, folder: 'blocks' },
  'usage-card-default': { Component: UsageCardDefault, folder: 'blocks' },
  'tooltip-default': { Component: TooltipDefault, folder: 'tooltip' },
};
