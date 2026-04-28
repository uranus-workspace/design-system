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
import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react';
import { forwardRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '../../lib/cn.js';
import {
  type ResetPasswordFormValues,
  createResetPasswordFormSchema,
} from './reset-password-form.schema.js';

export type { ResetPasswordFormValues };

export interface ResetPasswordFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'title'> {
  onSubmit: (values: ResetPasswordFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
  title?: ReactNode;
  description?: ReactNode;
  /** Minimum allowed password length. Defaults to 8 — Zod resolver updates when this changes. */
  minLength?: number;
}

/**
 * Presentational reset-password form with matching passwords enforced via Zod `superRefine`.
 */
export const ResetPasswordForm = forwardRef<HTMLFormElement, ResetPasswordFormProps>(
  function ResetPasswordForm(props, forwardedRef: ForwardedRef<HTMLFormElement>) {
    const {
      onSubmit,
      loading = false,
      error = null,
      title = 'Set a new password',
      description = 'Choose a strong password to secure your account.',
      minLength = 8,
      className,
      ...rest
    } = props;

    const schema = useMemo(() => createResetPasswordFormSchema(minLength), [minLength]);

    const form = useForm<ResetPasswordFormValues>({
      resolver: zodResolver(schema),
      defaultValues: { confirmPassword: '', password: '' },
    });

    return (
      <Form {...form}>
        <form
          {...rest}
          ref={forwardedRef}
          data-slot="reset-password-form"
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
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {loading ? 'Updating…' : 'Update password'}
            </Button>
          </fieldset>
        </form>
      </Form>
    );
  },
);
