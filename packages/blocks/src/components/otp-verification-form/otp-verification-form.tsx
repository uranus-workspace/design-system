import {
  Alert,
  AlertDescription,
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@uranus-workspace/design-system';
import {
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { cn } from '../../lib/cn.js';

export interface OtpVerificationFormValues {
  code: string;
}

export interface OtpVerificationFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'title'> {
  onSubmit: (values: OtpVerificationFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
  title?: ReactNode;
  description?: ReactNode;
  /** Number of OTP digits. Defaults to 6. */
  length?: number;
  /** Optional resend handler. When provided, the resend button is rendered. */
  onResend?: () => void | Promise<void>;
  /** Resend cooldown in seconds. Defaults to 30. */
  resendCooldown?: number;
  /** When true, the form auto-submits as soon as `length` digits are entered. */
  autoSubmit?: boolean;
}

/**
 * Presentational OTP verification form built on the `InputOTP` primitive.
 *
 * Manages the code state internally and submits when the user clicks the
 * verify button (or automatically if `autoSubmit` is enabled). Includes a
 * resend cooldown timer when `onResend` is provided.
 */
export const OtpVerificationForm = forwardRef<HTMLFormElement, OtpVerificationFormProps>(
  function OtpVerificationForm(
    {
      onSubmit,
      loading = false,
      error = null,
      title = 'Verify your email',
      description = 'We sent a verification code to your email.',
      length = 6,
      onResend,
      resendCooldown = 30,
      autoSubmit = false,
      className,
      ...props
    },
    ref,
  ) {
    const codeId = useId();
    const [code, setCode] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(0);
    const submittedRef = useRef(false);

    useEffect(() => {
      if (secondsLeft <= 0) return;
      const id = window.setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => window.clearInterval(id);
    }, [secondsLeft]);

    const submit = (value: string) => {
      if (loading) return;
      submittedRef.current = true;
      void onSubmit({ code: value });
    };

    const handleChange = (value: string) => {
      submittedRef.current = false;
      setCode(value);
      if (autoSubmit && value.length === length && !loading) {
        submit(value);
      }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (code.length !== length) return;
      submit(code);
    };

    const handleResend = async () => {
      if (!onResend || secondsLeft > 0) return;
      setSecondsLeft(resendCooldown);
      await onResend();
    };

    return (
      <form
        ref={ref}
        data-slot="otp-verification-form"
        onSubmit={handleSubmit}
        noValidate
        className={cn('flex flex-col gap-6 text-center', className)}
        {...props}
      >
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </header>

        {error ? (
          <Alert variant="destructive" className="text-left">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <fieldset disabled={loading} className="flex flex-col items-center gap-4">
          <label htmlFor={codeId} className="sr-only">
            Verification code
          </label>
          <InputOTP
            id={codeId}
            name="code"
            maxLength={length}
            value={code}
            onChange={handleChange}
            autoFocus
          >
            <InputOTPGroup>
              {Array.from({ length }, (_unused, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: slots are positional by design
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button type="submit" className="w-full" disabled={code.length !== length}>
            {loading ? 'Verifying…' : 'Verify'}
          </Button>
        </fieldset>

        {onResend ? (
          <p className="text-sm text-muted-foreground">
            Didn’t receive a code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className="font-medium text-foreground underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
            >
              {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : 'Resend'}
            </button>
          </p>
        ) : null}
      </form>
    );
  },
);
