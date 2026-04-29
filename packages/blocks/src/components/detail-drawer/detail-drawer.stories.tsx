import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';
import { DetailDrawer } from './detail-drawer.js';

const meta: Meta<typeof DetailDrawer> = {
  title: 'Blocks/Feedback/DetailDrawer',
  component: DetailDrawer,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof DetailDrawer>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir detalhe</Button>
        <DetailDrawer
          {...args}
          open={open}
          onOpenChange={setOpen}
          title="Cliente: Apollo SA"
          description="Criado em 12 de jan, 2025"
          headerActions={<Button size="sm">Editar</Button>}
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Fechar
              </Button>
              <Button size="sm">Salvar</Button>
            </>
          }
        >
          <dl className="grid grid-cols-1 gap-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">Email</dt>
              <dd>contato@apollo.com.br</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Plano</dt>
              <dd>Pro · R$ 499/mês</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Status</dt>
              <dd>Ativo</dd>
            </div>
          </dl>
        </DetailDrawer>
      </>
    );
  },
  args: {
    size: 'md',
    open: false,
    onOpenChange: () => {},
    title: '',
    children: null,
  },
};
