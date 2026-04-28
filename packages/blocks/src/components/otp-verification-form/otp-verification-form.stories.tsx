import type { Meta, StoryObj } from '@storybook/react';
import { OtpVerificationForm } from './otp-verification-form.js';

const meta: Meta<typeof OtpVerificationForm> = {
  title: 'Blocks/Auth/OtpVerificationForm',
  component: OtpVerificationForm,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof OtpVerificationForm>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
    onResend: () => {},
  },
};

export const FourDigit: Story = {
  args: {
    length: 4,
    onSubmit: () => {},
  },
};

export const WithError: Story = {
  args: {
    error: 'Código inválido. Tente novamente.',
    onSubmit: () => {},
    onResend: () => {},
  },
};
