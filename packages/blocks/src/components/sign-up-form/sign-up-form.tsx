import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Progress,
} from '@uranus-workspace/design-system';
import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '../../lib/cn.js';
import { BlockLink } from '../../lib/link.js';
import { type SignUpFormValues, signUpFormSchema } from './sign-up-form.schema.js';

interface SignUpShared {
  loading?: boolean;
  error?: string | null;
  title?: ReactNode;
  description?: ReactNode;
  socialProviders?: ReactNode;
  signInHref?: string;
  termsLabel?: ReactNode;
}

export type SignUpFormCredentialProps = SignUpShared & {
  credentials?: 'visible';
  onSubmit: (values: SignUpFormValues) => void | Promise<void>;
} & Omit<HTMLAttributes<HTMLFormElement>, 'title' | 'onSubmit'>;

export type SignUpFormOAuthOnlyProps = SignUpShared & {
  credentials: 'hidden';
  onSubmit?: undefined;
  onReset?: HTMLAttributes<HTMLDivElement>['onReset'];
  onSubmitCapture?: HTMLAttributes<HTMLDivElement>['onSubmitCapture'];
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export type SignUpFormProps = SignUpFormCredentialProps | SignUpFormOAuthOnlyProps;

interface PasswordStrength {
  score: number;
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

const SignUpOAuthOnlyInner = forwardRef<HTMLDivElement, SignUpFormOAuthOnlyProps>(
  function SignUpOAuthOnlyInner(
    {
      className,
      title = 'Create your account',
      description,
      error,
      socialProviders,
      signInHref,
      loading,
      termsLabel,
      credentials,
      ...shellProps
    },
    ref,
  ) {
    void termsLabel;
    void credentials;

    return (
      <div
        ref={ref}
        data-slot="sign-up-form"
        data-credentials="hidden"
        className={cn('flex flex-col gap-6', className)}
        {...shellProps}
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

        {loading ? (
          <p className="text-center text-sm text-muted-foreground" role="status">
            Loading…
          </p>
        ) : null}

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
      </div>
    );
  },
);

SignUpOAuthOnlyInner.displayName = 'SignUpOAuthOnlyInner';

const SignUpCredentialInner = forwardRef<HTMLFormElement, SignUpFormCredentialProps>(
  function SignUpCredentialInner(props, forwardedRef: ForwardedRef<HTMLFormElement>) {
    const {
      onSubmit,
      loading = false,
      error = null,
      title = 'Create your account',
      description,
      socialProviders,
      signInHref,
      termsLabel = 'I accept the Terms of Service and Privacy Policy.',
      className,
      credentials,
      ...formProps
    } = props;

    void credentials;

    const form = useForm<SignUpFormValues>({
      resolver: zodResolver(signUpFormSchema),
      defaultValues: {
        acceptTerms: false,
        email: '',
        name: '',
        password: '',
      },
    });

    const password = form.watch('password');
    const strength = evaluatePassword(password);
    const meterValue = (strength.score / 4) * 100;

    return (
      <Form {...form}>
        <form
          {...formProps}
          ref={forwardedRef}
          data-slot="sign-up-form"
          data-credentials="visible"
          className={cn('flex flex-col gap-6', className)}
          noValidate
          onSubmit={form.handleSubmit(async (values) => {
            if (loading) return;
            await onSubmit(values);
          })}
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="you@uranus.com.br"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      aria-describedby="sign-up-password-strength"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <div id="sign-up-password-strength" className="flex flex-col gap-1">
                    <Progress
                      value={meterValue}
                      aria-label="Password strength"
                      aria-valuetext={strength.label || 'Empty'}
                      className="h-1"
                    />
                    <span className="text-xs text-muted-foreground">{strength.label}</span>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-2 space-y-0">
                  <FormControl className="!mt-0.5 shrink-0 flex">
                    <Checkbox
                      aria-label={
                        typeof termsLabel === 'string'
                          ? termsLabel
                          : 'Accept the terms of service and privacy policy'
                      }
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  </FormControl>
                  <div className="flex flex-col gap-1">
                    <div className="cursor-pointer text-sm font-normal leading-snug">
                      {termsLabel}
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

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
      </Form>
    );
  },
);

SignUpCredentialInner.displayName = 'SignUpCredentialInner';

/** Sign-up backed by exported `signUpFormSchema`; set `credentials="hidden"` for SSO-only onboarding. */
export const SignUpForm = forwardRef<HTMLElement, SignUpFormProps>(function SignUpForm(props, ref) {
  if (props.credentials === 'hidden') {
    return (
      <SignUpOAuthOnlyInner
        {...(props as SignUpFormOAuthOnlyProps)}
        ref={ref as ForwardedRef<HTMLDivElement>}
      />
    );
  }
  return (
    <SignUpCredentialInner
      {...(props as SignUpFormCredentialProps)}
      ref={ref as ForwardedRef<HTMLFormElement>}
    />
  );
});
