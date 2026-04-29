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
} from '@uranus-workspace/design-system';
import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '../../lib/cn.js';
import { BlockLink } from '../../lib/link.js';
import { type SignInFormValues, signInFormSchema } from './sign-in-form.schema.js';

interface SignInFormShared {
  error?: string | null;
  title?: ReactNode;
  description?: ReactNode;
  socialProviders?: ReactNode;
  forgotPasswordHref?: string;
  signUpHref?: string;
  hideRememberMe?: boolean;
  loading?: boolean;
}

export type SignInFormCredentialProps = SignInFormShared & {
  credentials?: 'visible';
  onSubmit: (values: SignInFormValues) => void | Promise<void>;
} & Omit<HTMLAttributes<HTMLFormElement>, 'title' | 'onSubmit'>;

export type SignInFormOAuthOnlyProps = SignInFormShared & {
  credentials: 'hidden';
  onSubmit?: undefined;
  onReset?: HTMLAttributes<HTMLDivElement>['onReset'];
  onSubmitCapture?: HTMLAttributes<HTMLDivElement>['onSubmitCapture'];
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export type SignInFormProps = SignInFormCredentialProps | SignInFormOAuthOnlyProps;

function ShellHeader({ title, description }: Pick<SignInFormShared, 'description' | 'title'>) {
  return (
    <header className="flex flex-col gap-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        {title ?? 'Bem-vindo de volta'}
      </h1>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </header>
  );
}

const SignInOAuthOnlyInner = forwardRef<HTMLDivElement, SignInFormOAuthOnlyProps>(
  function SignInOAuthOnlyInner(
    {
      className,
      title = 'Bem-vindo de volta',
      description,
      error,
      socialProviders,
      signUpHref,
      loading,
      credentials,
      ...shellProps
    },
    ref,
  ) {
    void credentials;

    return (
      <div
        ref={ref}
        data-slot="sign-in-form"
        data-credentials="hidden"
        className={cn('flex flex-col gap-6', className)}
        {...shellProps}
      >
        <ShellHeader description={description} title={title} />

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

        {loading ? (
          <p className="text-center text-sm text-muted-foreground" role="status">
            Carregando…
          </p>
        ) : null}

        {signUpHref ? (
          <p className="text-center text-sm text-muted-foreground">
            {'Ainda não tem conta? '}
            <BlockLink
              href={signUpHref}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Criar conta
            </BlockLink>
          </p>
        ) : null}
      </div>
    );
  },
);

SignInOAuthOnlyInner.displayName = 'SignInOAuthOnlyInner';

const SignInCredentialInner = forwardRef<HTMLFormElement, SignInFormCredentialProps>(
  function SignInCredentialInner(props, forwardedRef: ForwardedRef<HTMLFormElement>) {
    const {
      onSubmit,
      loading = false,
      error = null,
      title = 'Bem-vindo de volta',
      description,
      socialProviders,
      forgotPasswordHref,
      signUpHref,
      hideRememberMe = false,
      className,
      credentials,
      ...formProps
    } = props;

    void credentials;

    const form = useForm<SignInFormValues>({
      resolver: zodResolver(signInFormSchema),
      defaultValues: {
        email: '',
        password: '',
        rememberMe: false,
      },
    });

    return (
      <Form {...form}>
        <form
          {...formProps}
          ref={forwardedRef}
          data-slot="sign-in-form"
          data-credentials="visible"
          className={cn('flex flex-col gap-6', className)}
          noValidate
          onSubmit={form.handleSubmit(async (values) => {
            if (loading) return;
            await onSubmit(values);
          })}
        >
          <ShellHeader description={description} title={title} />

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
                      placeholder="voce@uranus.com.br"
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Senha</FormLabel>
                    {forgotPasswordHref ? (
                      <BlockLink
                        href={forgotPasswordHref}
                        className="text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
                      >
                        Esqueceu a senha?
                      </BlockLink>
                    ) : null}
                  </div>
                  <FormControl>
                    <Input type="password" autoComplete="current-password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!hideRememberMe ? (
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-2 space-y-0">
                    <FormControl className="!mt-0.5 shrink-0 flex">
                      <Checkbox
                        aria-label="Manter conectado"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                    </FormControl>
                    <span className="text-sm font-normal leading-snug pb-1.5 pt-1.5">
                      Manter conectado
                    </span>
                  </FormItem>
                )}
              />
            ) : null}

            <Button type="submit" className="w-full">
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>
          </fieldset>

          {signUpHref ? (
            <p className="text-center text-sm text-muted-foreground">
              {'Ainda não tem conta? '}
              <BlockLink
                href={signUpHref}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Criar conta
              </BlockLink>
            </p>
          ) : null}
        </form>
      </Form>
    );
  },
);

SignInCredentialInner.displayName = 'SignInCredentialInner';

/** Sign-in wired to exported `signInFormSchema`; set `credentials="hidden"` for SSO-only stacks. */
export const SignInForm = forwardRef<HTMLElement, SignInFormProps>(function SignInForm(props, ref) {
  if (props.credentials === 'hidden') {
    return (
      <SignInOAuthOnlyInner
        {...(props as SignInFormOAuthOnlyProps)}
        ref={ref as ForwardedRef<HTMLDivElement>}
      />
    );
  }
  return (
    <SignInCredentialInner
      {...(props as SignInFormCredentialProps)}
      ref={ref as ForwardedRef<HTMLFormElement>}
    />
  );
});
