export {
  SearchCommand,
  type SearchCommandGroupConfig,
  type SearchCommandGroupProps,
  type SearchCommandItemConfig,
  type SearchCommandItemSlotProps,
  type SearchCommandProps,
} from './search-command.js';

/** @deprecated Use `SearchCommandGroupConfig` for the `groups` prop type. */
export type SearchCommandGroup = import('./search-command.js').SearchCommandGroupConfig;
/** @deprecated Use `SearchCommandItemConfig` for items inside `groups`. */
export type SearchCommandItem = import('./search-command.js').SearchCommandItemConfig;
