import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, Label } from '@uranus-workspace/design-system';
import { AuthLayout } from './auth-layout.js';

const meta: Meta<typeof AuthLayout> = {
  title: 'Blocks/Chrome/AuthLayout',
  component: AuthLayout,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AuthLayout>;

const SampleForm = () => (
  <form className="flex flex-col gap-4" aria-label="Sign in form">
    <h1 className="text-2xl font-semibold">Welcome back</h1>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@uranus.com.br" />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" />
    </div>
    <Button type="submit">Sign in</Button>
  </form>
);

export const Split: Story = {
  args: {
    brandPanel: (
      <div className="flex h-full flex-col justify-between">
        <span className="text-xl font-semibold">Uranus</span>
        <p className="max-w-xs text-balance text-sm">
          O hub de serviços flexível e escalável da Uranus Technologies.
        </p>
      </div>
    ),
    children: <SampleForm />,
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    children: <SampleForm />,
  },
};
