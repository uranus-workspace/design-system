import { Alert, AlertDescription, Button, Input, Label } from '@uranus-workspace/design-system';
import {
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
  useState,
} from 'react';
import { cn } from '../../lib/cn.js';

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'title'> {
  onSubmit: (values: ResetPasswordFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
  title?: ReactNode;
  description?: ReactNode;
  /** Minimum allowed password length. Defaults to 8. */
  minLength?: number;
}

/**
 * Presentational reset-password form — new password + confirm with inline
 * client-side mismatch validation. The actual reset token handling is the
 * consumer's responsibility (typically read from URL).
 */
export const ResetPasswordForm = forwardRef<HTMLFormElement, ResetPasswordFormProps>(
  function ResetPasswordForm(
    {
      onSubmit,
      loading = false,
      error = null,
      title = 'Set a new password',
      description = 'Choose a strong password to secure your account.',
      minLength = 8,
      className,
      ...props
    },
    ref,
  ) {
    const passwordId = useId();
    const confirmId = useId();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const mismatch = confirm.length > 0 && password !== confirm;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (loading || mismatch) return;
      const formData = new FormData(event.currentTarget);
      void onSubmit({
        password: String(formData.get('password') ?? ''),
        confirmPassword: String(formData.get('confirmPassword') ?? ''),
      });
    };

    return (
      <form
        ref={ref}
        data-slot="reset-password-form"
        onSubmit={handleSubmit}
        noValidate
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </header>

        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <fieldset disabled={loading} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={passwordId}>New password</Label>
            <Input
              id={passwordId}
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={minLength}
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={confirmId}>Confirm password</Label>
            <Input
              id={confirmId}
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={minLength}
              value={confirm}
              onChange={(event) => setConfirm(event.currentTarget.value)}
              aria-invalid={mismatch || undefined}
              aria-describedby={mismatch ? `${confirmId}-error` : undefined}
            />
            {mismatch ? (
              <span id={`${confirmId}-error`} className="text-xs text-destructive">
                Passwords do not match.
              </span>
            ) : null}
          </div>

          <Button type="submit" className="w-full" disabled={mismatch}>
            {loading ? 'Updating…' : 'Update password'}
          </Button>
        </fieldset>
      </form>
    );
  },
);
