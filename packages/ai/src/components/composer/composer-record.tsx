import { Button } from '@uranus-workspace/design-system';
import { Loader2, Mic, Square } from 'lucide-react';
import { type ComponentProps, forwardRef, useEffect } from 'react';
import { useAudioRecorder } from '../../hooks/use-audio-recorder.js';
import { cn } from '../../lib/cn.js';
import { useComposer } from './context.js';

export interface ComposerRecordButtonProps
  extends Omit<ComponentProps<typeof Button>, 'onClick' | 'type' | 'children'> {
  /** Mime type for MediaRecorder. */
  mimeType?: string;
  /** Optional transcription function (Whisper, AssemblyAI, your endpoint, …). */
  transcribe?: (blob: Blob) => Promise<string>;
  /** Called with the raw audio blob once recording stops. */
  onAudio?: (blob: Blob) => void;
  /** Behaviour when transcription resolves: append to value or replace. Default `'append'`. */
  transcriptMode?: 'append' | 'replace';
  /** Also attach the audio blob as a Composer attachment when recording stops. Default `false`. */
  attachOnStop?: boolean;
  /** sr-only label for the idle button. Default "Gravar áudio". */
  label?: string;
}

function formatElapsed(ms: number): string {
  const total = Math.floor(ms / 1000);
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (total % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export const ComposerRecordButton = forwardRef<HTMLButtonElement, ComposerRecordButtonProps>(
  function ComposerRecordButton(
    {
      mimeType,
      transcribe,
      onAudio,
      transcriptMode = 'append',
      attachOnStop = false,
      label = 'Gravar áudio',
      className,
      disabled,
      ...props
    },
    ref,
  ) {
    const composer = useComposer();
    const recorder = useAudioRecorder({
      mimeType,
      onAudio: (blob) => {
        onAudio?.(blob);
        if (attachOnStop) {
          const ext = (blob.type.split('/')[1] ?? 'webm').split(';')[0];
          composer.addAttachments([
            new File([blob], `audio-${Date.now()}.${ext}`, { type: blob.type }),
          ]);
        }
      },
      transcribe,
      onTranscript: (text) => {
        if (!text) return;
        if (transcriptMode === 'replace') composer.setValue(text);
        else composer.setValue(`${composer.value ? `${composer.value} ` : ''}${text}`.trimStart());
      },
    });

    useEffect(() => {
      composer.setRecording(recorder.isRecording);
    }, [recorder.isRecording, composer]);

    const isBusy = recorder.status === 'requesting';
    const isRecording = recorder.isRecording;

    return (
      <div className="flex items-center gap-1.5">
        {isRecording ? (
          <span
            data-slot="composer-record-timer"
            aria-live="polite"
            className="font-mono text-xs tabular-nums text-destructive"
          >
            {formatElapsed(recorder.elapsedMs)}
          </span>
        ) : null}

        {isRecording ? (
          <span
            aria-hidden
            data-slot="composer-record-meter"
            className="block h-1.5 w-12 overflow-hidden rounded-full bg-muted"
          >
            <span
              className="block h-full origin-left rounded-full bg-destructive transition-[width] duration-75"
              style={{ width: `${Math.min(100, Math.round(recorder.level * 140))}%` }}
            />
          </span>
        ) : null}

        <Button
          {...props}
          ref={ref}
          type="button"
          variant={isRecording ? 'destructive' : 'ghost'}
          size="icon"
          aria-label={isRecording ? 'Parar gravação' : label}
          disabled={disabled || composer.disabled || isBusy}
          className={cn(
            'h-9 w-9 shrink-0 rounded-full',
            !isRecording && 'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
            className,
          )}
          onClick={() => {
            if (isRecording) recorder.stop();
            else void recorder.start();
          }}
          data-slot="composer-record-button"
          data-recording={isRecording || undefined}
        >
          {isBusy ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : isRecording ? (
            <Square aria-hidden className="size-3.5 fill-current" />
          ) : (
            <Mic aria-hidden className="size-4" />
          )}
        </Button>
      </div>
    );
  },
);
