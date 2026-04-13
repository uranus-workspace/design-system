import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button/button.js';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer.js';

const meta: Meta<typeof Drawer> = {
  title: 'Primitives/Drawer',
  component: Drawer,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Abrir drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Configurações</DrawerTitle>
          <DrawerDescription>Ajuste o seu workspace Uranus.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Salvar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
