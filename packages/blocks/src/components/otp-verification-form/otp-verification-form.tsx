import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  AlertDescription,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@uranus-workspace/design-system';
import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react';
import { forwardRef, useEffect, useId, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '../../lib/cn.js';
import {
  type OtpVerificationFormValues,
  createOtpVerificationFormSchema,
} from './otp-verification-form.schema.js';

export type { OtpVerificationFormValues };

export interface OtpVerificationFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'title'> {
  onSubmit: (values: OtpVerificationFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
  title?: ReactNode;
  description?: ReactNode;
  length?: number;
  onResend?: () => void | Promise<void>;
  resendCooldown?: number;
  autoSubmit?: boolean;
}

/**
 * OTP verification with exported Zod schema; optional auto-submit when `length` digits are filled.
 */
export const OtpVerificationForm = forwardRef<HTMLFormElement, OtpVerificationFormProps>(
  function OtpVerificationForm(props, forwardedRef: ForwardedRef<HTMLFormElement>) {
    const codeFieldId = useId();

    const {
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
      ...rest
    } = props;

    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
      if (secondsLeft <= 0) return;
      const id = window.setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => window.clearInterval(id);
    }, [secondsLeft]);

    const schema = useMemo(() => createOtpVerificationFormSchema(length), [length]);

    const form = useForm<OtpVerificationFormValues>({
      resolver: zodResolver(schema),
      defaultValues: { code: '' },
      mode: 'onChange',
    });

    const codeValue = form.watch('code');

    return (
      <Form {...form}>
        <form
          {...rest}
          ref={forwardedRef}
          data-slot="otp-verification-form"
          className={cn('flex flex-col gap-6 text-center', className)}
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
            <Alert variant="destructive" className="text-left">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <fieldset disabled={loading} className="flex flex-col items-center gap-4">
            <label htmlFor={codeFieldId} className="sr-only">
              Verification code
            </label>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormControl>
                    <InputOTP
                      id={codeFieldId}
                      autoFocus
                      maxLength={length}
                      name={field.name}
                      value={field.value}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={(value) => {
                        field.onChange(value);
                        if (autoSubmit && value.length === length && !loading) {
                          void form.handleSubmit(async (data) => {
                            await onSubmit(data);
                          })();
                        }
                      }}
                    >
                      <InputOTPGroup>
                        {Array.from({ length }, (_unused, index) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: OTP slot rows are keyed by digit index
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={codeValue.length !== length}>
              {loading ? 'Verifying…' : 'Verify'}
            </Button>
          </fieldset>

          {onResend ? (
            <p className="text-sm text-muted-foreground">
              Didn’t receive a code?{' '}
              <button
                type="button"
                onClick={async () => {
                  if (secondsLeft > 0) return;
                  setSecondsLeft(resendCooldown);
                  await onResend();
                }}
                disabled={secondsLeft > 0}
                className="font-medium text-foreground underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
              >
                {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : 'Resend'}
              </button>
            </p>
          ) : null}
        </form>
      </Form>
    );
  },
);
