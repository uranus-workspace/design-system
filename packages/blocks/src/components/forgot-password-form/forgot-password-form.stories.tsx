import type { Meta, StoryObj } from '@storybook/react';
import { ForgotPasswordForm } from './forgot-password-form.js';

const meta: Meta<typeof ForgotPasswordForm> = {
  title: 'Blocks/Auth/ForgotPasswordForm',
  component: ForgotPasswordForm,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ForgotPasswordForm>;

export const Default: Story = {
  args: {
    signInHref: '#',
    onSubmit: () => {},
  },
};

export const SuccessState: Story = {
  args: {
    success: true,
    signInHref: '#',
    onSubmit: () => {},
  },
};
