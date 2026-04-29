import type { Meta, StoryObj } from '@storybook/react';
import { ResetPasswordForm } from './reset-password-form.js';

const meta: Meta<typeof ResetPasswordForm> = {
  title: 'Blocks/Auth/ResetPasswordForm',
  component: ResetPasswordForm,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
  },
};

export const WithError: Story = {
  args: {
    error: 'Reset link expirou. Solicite um novo email.',
    onSubmit: () => {},
  },
};
