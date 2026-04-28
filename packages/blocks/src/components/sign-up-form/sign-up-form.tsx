import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  Input,
  Label,
  Progress,
} from '@uranus-workspace/design-system';
import {
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
  useState,
} from 'react';
import { cn } from '../../lib/cn.js';
import { BlockLink } from '../../lib/link.js';

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export interface SignUpFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'title'> {
  onSubmit: (values: SignUpFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
  title?: ReactNode;
  description?: ReactNode;
  socialProviders?: ReactNode;
  signInHref?: string;
  /** Renderable terms label, e.g. `<>I accept the <a href="/terms">Terms</a></>`. */
  termsLabel?: ReactNode;
}

interface PasswordStrength {
  score: number; // 0–4
  label: string;
}

function evaluatePassword(password: string): PasswordStrength {
  if (!password) return { score: 0, label: '' };
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, label: labels[score] ?? '' };
}

/**
 * Presentational sign-up form — name + email + password + Terms checkbox,
 * with a live password-strength meter using the `Progress` primitive.
 *
 * Stays provider-agnostic: every backend integration happens in the consumer's
 * `onSubmit` handler.
 */
export const SignUpForm = forwardRef<HTMLFormElement, SignUpFormProps>(function SignUpForm(
  {
    onSubmit,
    loading = false,
    error = null,
    title = 'Create your account',
    description,
    socialProviders,
    signInHref,
    termsLabel = 'I accept the Terms of Service and Privacy Policy.',
    className,
    ...props
  },
  ref,
) {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const termsId = useId();
  const [password, setPassword] = useState('');
  const strength = evaluatePassword(password);
  const meterValue = (strength.score / 4) * 100;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    const formData = new FormData(event.currentTarget);
    const values: SignUpFormValues = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      acceptTerms: formData.get('acceptTerms') === 'on',
    };
    void onSubmit(values);
  };

  return (
    <form
      ref={ref}
      data-slot="sign-up-form"
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
        <Alert variant="destructive" data-slot="sign-up-form-error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {socialProviders ? (
        <div data-slot="sign-up-form-social" className="flex flex-col gap-2">
          {socialProviders}
        </div>
      ) : null}

      <fieldset disabled={loading} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={nameId}>Full name</Label>
          <Input id={nameId} name="name" autoComplete="name" required />
        </div>

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
          <Label htmlFor={passwordId}>Password</Label>
          <Input
            id={passwordId}
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            aria-describedby={`${passwordId}-strength`}
          />
          <div id={`${passwordId}-strength`} className="flex flex-col gap-1">
            <Progress
              value={meterValue}
              aria-label="Password strength"
              aria-valuetext={strength.label || 'Empty'}
              className="h-1"
            />
            <span className="text-xs text-muted-foreground">{strength.label}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id={termsId}
            name="acceptTerms"
            required
            aria-labelledby={`${termsId}-label`}
            className="mt-0.5"
          />
          <Label
            id={`${termsId}-label`}
            htmlFor={termsId}
            className="text-sm font-normal leading-snug"
          >
            {termsLabel}
          </Label>
        </div>

        <Button type="submit" className="w-full">
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </fieldset>

      {signInHref ? (
        <p className="text-center text-sm text-muted-foreground">
          {'Already have an account? '}
          <BlockLink
            href={signInHref}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </BlockLink>
        </p>
      ) : null}
    </form>
  );
});
