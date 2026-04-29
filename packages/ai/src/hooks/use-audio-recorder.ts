import { useCallback, useEffect, useRef, useState } from 'react';

export type AudioRecorderStatus =
  | 'idle'
  | 'requesting'
  | 'recording'
  | 'paused'
  | 'stopped'
  | 'error';

export interface UseAudioRecorderOptions {
  /** Mime type passed to MediaRecorder. Defaults to browser pick. */
  mimeType?: string;
  /** Called once a recording is fully stopped, with the captured Blob. */
  onAudio?: (blob: Blob) => void;
  /** Optional consumer-supplied transcription. Called after `onAudio`. */
  transcribe?: (blob: Blob) => Promise<string>;
  /** Called after `transcribe` resolves. */
  onTranscript?: (text: string) => void;
}

export interface UseAudioRecorderResult {
  status: AudioRecorderStatus;
  /** Approx audio level in [0, 1] from the analyser. Useful for waveform UI. */
  level: number;
  /** Elapsed time in ms while actively recording (0 when idle/stopped). */
  elapsedMs: number;
  /** Last transcript returned by `transcribe`. */
  transcript: string | null;
  /** Last error message, if any. */
  error: string | null;
  /** True between `start()` and `stop()`. */
  isRecording: boolean;
  start: () => Promise<void>;
  stop: () => void;
  cancel: () => void;
}

/**
 * Wraps `MediaRecorder` + a `getUserMedia` analyser. Stays presentational by
 * default — pass `transcribe` to plug in Whisper/AssemblyAI/etc., or read the
 * raw `Blob` via `onAudio` and ship to your own endpoint.
 */
export function useAudioRecorder(options: UseAudioRecorderOptions = {}): UseAudioRecorderResult {
  const { mimeType, onAudio, transcribe, onTranscript } = options;

  const [status, setStatus] = useState<AudioRecorderStatus>('idle');
  const [level, setLevel] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const elapsedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelledRef = useRef(false);

  const cleanup = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (elapsedTimerRef.current) {
      clearInterval(elapsedTimerRef.current);
      elapsedTimerRef.current = null;
    }
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      void audioCtxRef.current.close().catch(() => undefined);
    }
    audioCtxRef.current = null;
    analyserRef.current = null;
    recorderRef.current = null;
    setLevel(0);
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const tickLevel = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const value = ((data[i] ?? 128) - 128) / 128;
      sum += value * value;
    }
    const rms = Math.sqrt(sum / data.length);
    setLevel(Math.min(1, rms * 2));
    rafRef.current = requestAnimationFrame(tickLevel);
  }, []);

  const start = useCallback(async () => {
    if (status === 'recording') return;
    setError(null);
    setTranscript(null);
    setStatus('requesting');
    cancelledRef.current = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recorderRef.current = recorder;
      chunksRef.current = [];

      const AudioCtx =
        typeof window !== 'undefined'
          ? (window.AudioContext ??
            (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)
          : undefined;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        source.connect(analyser);
        analyserRef.current = analyser;
        rafRef.current = requestAnimationFrame(tickLevel);
      }

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        cleanup();
        setStatus('stopped');
        setElapsedMs(0);
        startedAtRef.current = null;
        if (cancelledRef.current) return;
        onAudio?.(blob);
        if (transcribe) {
          try {
            const text = await transcribe(blob);
            setTranscript(text);
            onTranscript?.(text);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Falha ao transcrever áudio');
          }
        }
      };

      recorder.start();
      startedAtRef.current = Date.now();
      setStatus('recording');
      setElapsedMs(0);
      elapsedTimerRef.current = setInterval(() => {
        if (startedAtRef.current != null) setElapsedMs(Date.now() - startedAtRef.current);
      }, 100);
    } catch (err) {
      cleanup();
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Não foi possível acessar o microfone');
    }
  }, [status, mimeType, tickLevel, cleanup, onAudio, transcribe, onTranscript]);

  const stop = useCallback(() => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === 'inactive') {
      cleanup();
      setStatus('idle');
      return;
    }
    recorder.stop();
  }, [cleanup]);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
    stop();
  }, [stop]);

  return {
    status,
    level,
    elapsedMs,
    transcript,
    error,
    isRecording: status === 'recording',
    start,
    stop,
    cancel,
  };
}
