import { Alert, AlertDescription, Button, Input, Label } from '@uranus-workspace/design-system';
import { CheckCircle2 } from 'lucide-react';
import { type FormEvent, type HTMLAttributes, type ReactNode, forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';
import { BlockLink } from '../../lib/link.js';

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ForgotPasswordFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'title'> {
  onSubmit: (values: ForgotPasswordFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
  /** When true, hides the form and shows the success state instead. */
  success?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  successTitle?: ReactNode;
  successDescription?: ReactNode;
  signInHref?: string;
}

/**
 * Presentational "forgot password" form. Renders a single email input;
 * consumers flip `success` to true once the request resolves so the form is
 * replaced by an inline confirmation panel.
 */
export const ForgotPasswordForm = forwardRef<HTMLFormElement, ForgotPasswordFormProps>(
  function ForgotPasswordForm(
    {
      onSubmit,
      loading = false,
      error = null,
      success = false,
      title = 'Forgot your password?',
      description = 'Enter your email and we’ll send you a reset link.',
      successTitle = 'Check your inbox',
      successDescription = 'If an account exists for that email, we sent a password reset link to it.',
      signInHref,
      className,
      ...props
    },
    ref,
  ) {
    const emailId = useId();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (loading) return;
      const formData = new FormData(event.currentTarget);
      void onSubmit({ email: String(formData.get('email') ?? '') });
    };

    if (success) {
      return (
        <div
          ref={ref as never}
          data-slot="forgot-password-form-success"
          role="status"
          className={cn('flex flex-col gap-6 text-center', className)}
        >
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 aria-hidden className="size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {successTitle}
            </h1>
            <p className="text-sm text-muted-foreground">{successDescription}</p>
          </div>
          {signInHref ? (
            <Button asChild variant="outline">
              <BlockLink href={signInHref}>Back to sign in</BlockLink>
            </Button>
          ) : null}
        </div>
      );
    }

    return (
      <form
        ref={ref}
        data-slot="forgot-password-form"
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
            <Label htmlFor={emailId}>Email</Label>
            <Input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@uranus.com.br"
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? 'Sending…' : 'Send reset link'}
          </Button>
        </fieldset>

        {signInHref ? (
          <p className="text-center text-sm text-muted-foreground">
            <BlockLink
              href={signInHref}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Back to sign in
            </BlockLink>
          </p>
        ) : null}
      </form>
    );
  },
);
