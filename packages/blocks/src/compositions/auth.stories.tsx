import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout } from '../components/auth-layout/auth-layout.js';
import { ForgotPasswordForm } from '../components/forgot-password-form/forgot-password-form.js';
import { OtpVerificationForm } from '../components/otp-verification-form/otp-verification-form.js';
import { ResetPasswordForm } from '../components/reset-password-form/reset-password-form.js';
import { SignInForm } from '../components/sign-in-form/sign-in-form.js';
import { SignUpForm } from '../components/sign-up-form/sign-up-form.js';

const meta: Meta = {
  title: 'Blocks/Compositions/Auth',
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
};
export default meta;
type Story = StoryObj;

const BrandPanel = () => (
  <div className="flex h-full flex-col justify-between">
    <span className="text-xl font-semibold">Uranus</span>
    <p className="max-w-xs text-balance text-sm">
      O hub de serviços flexível e escalável da Uranus Technologies.
    </p>
  </div>
);

export const SignIn: Story = {
  render: () => (
    <AuthLayout brandPanel={<BrandPanel />}>
      <SignInForm
        forgotPasswordHref="#"
        signUpHref="#"
        description="Use seu email Uranus para entrar."
        onSubmit={() => {}}
      />
    </AuthLayout>
  ),
};

export const SignUp: Story = {
  render: () => (
    <AuthLayout brandPanel={<BrandPanel />}>
      <SignUpForm
        signInHref="#"
        description="Crie sua conta Uranus em menos de um minuto."
        onSubmit={() => {}}
      />
    </AuthLayout>
  ),
};

export const ForgotPassword: Story = {
  render: () => (
    <AuthLayout brandPanel={<BrandPanel />}>
      <ForgotPasswordForm signInHref="#" onSubmit={() => {}} />
    </AuthLayout>
  ),
};

export const ResetPassword: Story = {
  render: () => (
    <AuthLayout brandPanel={<BrandPanel />}>
      <ResetPasswordForm onSubmit={() => {}} />
    </AuthLayout>
  ),
};

export const OtpVerification: Story = {
  render: () => (
    <AuthLayout variant="centered">
      <OtpVerificationForm onSubmit={() => {}} onResend={() => {}} />
    </AuthLayout>
  ),
};
