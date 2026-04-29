// Types
export type {
  UranusAttachment,
  UranusChatMode,
  UranusChatStatus,
  UranusCitation,
  UranusMessage,
  UranusStage,
  UranusStageStatus,
  UranusToolCall,
} from './types.js';

// Utilities
export { cn } from './lib/cn.js';
export {
  caretBlinkTransition,
  dotPulseTransition,
  messageEnterVariants,
  prefersReducedMotion,
  shimmerTransition,
  sourceCycleVariants,
  stageEnterVariants,
} from './lib/animations.js';

// Tier A — Message primitives
export * from './components/message/index.js';
export * from './components/message-list/index.js';
export * from './components/message-markdown/index.js';
export * from './components/code-block/index.js';
export * from './components/streaming-text/index.js';
export * from './components/citation/index.js';

// Tier B — Status & animations
export * from './components/thinking-indicator/index.js';
export * from './components/searching-indicator/index.js';
export * from './components/reasoning-panel/index.js';
export * from './components/tool-call-card/index.js';
export * from './components/stage-list/index.js';

// Tier C — Composer (compound)
export * from './components/composer/index.js';
export * from './components/suggested-prompts/index.js';

// Tier D — Composed flows
export * from './components/chat/index.js';
export * from './components/chat-thread-list/index.js';
export * from './components/research-panel/index.js';
export * from './components/plan-panel/index.js';

// Tier E — Hooks
export * from './hooks/use-uranus-chat.js';
export * from './hooks/use-audio-recorder.js';
export * from './hooks/use-auto-scroll.js';
export * from './hooks/use-streaming-text.js';
