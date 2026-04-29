import { ComposerAttachButton } from './composer-attach.js';
import { ComposerAttachments } from './composer-attachments.js';
import { ComposerHints } from './composer-hints.js';
import { ComposerModeToggle } from './composer-mode.js';
import { ComposerRecordButton } from './composer-record.js';
import { ComposerRoot } from './composer-root.js';
import { ComposerSubmitButton } from './composer-submit.js';
import { ComposerTextarea } from './composer-textarea.js';
import { ComposerToolbar } from './composer-toolbar.js';

ComposerRoot.displayName = 'Composer';
ComposerTextarea.displayName = 'Composer.Textarea';
ComposerSubmitButton.displayName = 'Composer.SubmitButton';
ComposerHints.displayName = 'Composer.Hints';
ComposerToolbar.displayName = 'Composer.Toolbar';
ComposerAttachButton.displayName = 'Composer.AttachButton';
ComposerAttachments.displayName = 'Composer.Attachments';
ComposerRecordButton.displayName = 'Composer.RecordButton';
ComposerModeToggle.displayName = 'Composer.ModeToggle';

/**
 * Compound input bar for AI surfaces. Always wrap your sub-components in
 * `Composer.Root`, which owns input value, attachments, mode and submit
 * coordination. Keep `Composer.Textarea` first so the visible bar is the form
 * surface; place `Composer.Toolbar` after it for the action row.
 *
 * ```tsx
 * <Composer.Root onSubmit={({ text }) => sendMessage(text)} status={chat.status}>
 *   <Composer.Attachments />
 *   <Composer.Textarea />
 *   <Composer.Toolbar>
 *     <Composer.AttachButton />
 *     <Composer.RecordButton transcribe={whisper} />
 *     <Composer.ModeToggle />
 *     <span className="flex-1" />
 *     <Composer.SubmitButton />
 *   </Composer.Toolbar>
 *   <Composer.Hints />
 * </Composer.Root>
 * ```
 */
export const Composer = Object.assign(ComposerRoot, {
  Root: ComposerRoot,
  Textarea: ComposerTextarea,
  SubmitButton: ComposerSubmitButton,
  Hints: ComposerHints,
  Toolbar: ComposerToolbar,
  AttachButton: ComposerAttachButton,
  Attachments: ComposerAttachments,
  RecordButton: ComposerRecordButton,
  ModeToggle: ComposerModeToggle,
});
