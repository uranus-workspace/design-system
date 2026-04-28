import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  AlertDescription,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@uranus-workspace/design-system';
import { CheckCircle2 } from 'lucide-react';
import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '../../lib/cn.js';
import { BlockLink } from '../../lib/link.js';
import {
  type ForgotPasswordFormValues,
  forgotPasswordFormSchema,
} from './forgot-password-form.schema.js';

export type { ForgotPasswordFormValues };

export interface ForgotPasswordFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'title'> {
  onSubmit: (values: ForgotPasswordFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  successTitle?: ReactNode;
  successDescription?: ReactNode;
  signInHref?: string;
}

type ForgotPasswordFieldsInnerProps = Omit<
  ForgotPasswordFormProps,
  'success' | 'successDescription' | 'successTitle'
>;

const ForgotPasswordFieldsInner = forwardRef<HTMLFormElement, ForgotPasswordFieldsInnerProps>(
  function ForgotPasswordFieldsInner(props, forwardedRef) {
    const {
      className,
      description = 'Enter your email and we’ll send you a reset link.',
      error = null,
      loading = false,
      onSubmit,
      signInHref,
      title = 'Forgot your password?',
      ...formAttrs
    } = props;

    const form = useForm<ForgotPasswordFormValues>({
      resolver: zodResolver(forgotPasswordFormSchema),
      defaultValues: { email: '' },
    });

    return (
      <Form {...form}>
        <form
          {...formAttrs}
          ref={forwardedRef}
          data-slot="forgot-password-form"
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
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <fieldset disabled={loading} className="flex flex-col gap-4">
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
      </Form>
    );
  },
);

ForgotPasswordFieldsInner.displayName = 'ForgotPasswordFieldsInner';

/**
 * Presentational forgot-password email step (`success=false`) with exported Zod schema; success panel has no react-hook-form.
 */
export const ForgotPasswordForm = forwardRef<HTMLFormElement, ForgotPasswordFormProps>(
  function ForgotPasswordForm(props, ref) {
    const {
      onSubmit,
      loading,
      error,
      success,
      title,
      description,
      successTitle = 'Check your inbox',
      successDescription = 'If an account exists for that email, we sent a password reset link to it.',
      signInHref,
      className,
      ...remaining
    } = props;

    if (success) {
      return (
        <div
          ref={ref as ForwardedRef<HTMLDivElement>}
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

    const innerProps = {
      className,
      description,
      error,
      loading,
      onSubmit,
      signInHref,
      title,
      ...remaining,
    } satisfies ForgotPasswordFieldsInnerProps;

    return <ForgotPasswordFieldsInner {...innerProps} ref={ref} />;
  },
);
