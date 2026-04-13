import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card.js';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Project Apollo</CardTitle>
        <CardDescription>A brand-new launch on the Uranus platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Cards group related information and actions into a single surface.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
};
