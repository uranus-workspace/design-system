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

const BrandMark = () => (
  <div className="flex h-full min-h-[240px] flex-col justify-between gap-6 text-white">
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-white/80">
        Uranus Technologies
      </p>
      <p className="mt-3 max-w-sm text-balance text-2xl font-semibold leading-tight text-white">
        Design system que escala com o produto.
      </p>
    </div>
    <p className="max-w-xs text-sm text-white/85">
      Gradientes de marca via tokens — sem hex solto nos componentes.
    </p>
  </div>
);

const SampleForm = ({ title = 'Welcome back' }: { title?: string }) => (
  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
    <form className="flex flex-col gap-5" aria-label="Sign in form">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to continue.</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@uranus.com.br" autoComplete="email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" autoComplete="current-password" />
      </div>
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  </div>
);

export const SplitCosmic: Story = {
  name: 'Split · cosmic',
  args: {
    brandTone: 'cosmic',
    brandPanel: <BrandMark />,
    children: <SampleForm />,
  },
};

export const SplitNebula: Story = {
  name: 'Split · nebula',
  args: {
    brandTone: 'nebula',
    brandPanel: <BrandMark />,
    children: <SampleForm title="Create account" />,
  },
};

export const SplitAurora: Story = {
  name: 'Split · aurora',
  args: {
    brandTone: 'aurora',
    brandPanel: <BrandMark />,
    children: <SampleForm />,
  },
};

export const SplitGalaxy: Story = {
  name: 'Split · galaxy',
  args: {
    brandTone: 'galaxy',
    brandPanel: <BrandMark />,
    children: <SampleForm />,
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    children: <SampleForm title="Verify email" />,
  },
};
