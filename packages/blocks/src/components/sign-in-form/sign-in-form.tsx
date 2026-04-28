import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  Input,
  Label,
} from '@uranus-workspace/design-system';
import { type FormEvent, type HTMLAttributes, type ReactNode, forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';
import { BlockLink } from '../../lib/link.js';

export interface SignInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignInFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'title'> {
  /** Submit handler. Receives the typed values object. */
  onSubmit: (values: SignInFormValues) => void | Promise<void>;
  /** When true, the submit button shows a loading state and the form is disabled. */
  loading?: boolean;
  /** Server-side error message, rendered as a destructive `Alert` above the form. */
  error?: string | null;
  /** Heading rendered above the form. Defaults to `"Welcome back"`. */
  title?: ReactNode;
  /** Optional supporting copy below the heading. */
  description?: ReactNode;
  /** Slot for OAuth/SSO buttons rendered above the email field. */
  socialProviders?: ReactNode;
  /** href forwarded to the "forgot password" link. Hidden when omitted. */
  forgotPasswordHref?: string;
  /** href forwarded to the "create account" link. Hidden when omitted. */
  signUpHref?: string;
  /** Hide the "remember me" checkbox. Defaults to `false`. */
  hideRememberMe?: boolean;
}

/**
 * Presentational sign-in form — composes design-system primitives, exposes a
 * typed `onSubmit` callback, and stays 100% provider-agnostic.
 *
 * Renders a destructive `Alert` for the `error` prop and disables every
 * control while `loading` is true.
 */
export const SignInForm = forwardRef<HTMLFormElement, SignInFormProps>(function SignInForm(
  {
    onSubmit,
    loading = false,
    error = null,
    title = 'Welcome back',
    description,
    socialProviders,
    forgotPasswordHref,
    signUpHref,
    hideRememberMe = false,
    className,
    ...props
  },
  ref,
) {
  const emailId = useId();
  const passwordId = useId();
  const rememberMeId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    const formData = new FormData(event.currentTarget);
    const values: SignInFormValues = {
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      rememberMe: formData.get('rememberMe') === 'on',
    };
    void onSubmit(values);
  };

  return (
    <form
      ref={ref}
      data-slot="sign-in-form"
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
        <Alert variant="destructive" data-slot="sign-in-form-error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {socialProviders ? (
        <div data-slot="sign-in-form-social" className="flex flex-col gap-2">
          {socialProviders}
        </div>
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

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor={passwordId}>Password</Label>
            {forgotPasswordHref ? (
              <BlockLink
                href={forgotPasswordHref}
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
              >
                Forgot password?
              </BlockLink>
            ) : null}
          </div>
          <Input
            id={passwordId}
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {!hideRememberMe ? (
          <div className="flex items-center gap-2">
            <Checkbox
              id={rememberMeId}
              name="rememberMe"
              aria-labelledby={`${rememberMeId}-label`}
            />
            <Label
              id={`${rememberMeId}-label`}
              htmlFor={rememberMeId}
              className="text-sm font-normal"
            >
              Remember me
            </Label>
          </div>
        ) : null}

        <Button type="submit" className="w-full">
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </fieldset>

      {signUpHref ? (
        <p className="text-center text-sm text-muted-foreground">
          {'Don’t have an account? '}
          <BlockLink
            href={signUpHref}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create one
          </BlockLink>
        </p>
      ) : null}
    </form>
  );
});
