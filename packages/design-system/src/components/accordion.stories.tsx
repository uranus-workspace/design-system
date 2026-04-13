import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion.js';

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="a">
        <AccordionTrigger>O que é a Uranus?</AccordionTrigger>
        <AccordionContent>
          Um hub de serviços flexível e escalável, construído para a nova era dos negócios digitais.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Qual a paleta da marca?</AccordionTrigger>
        <AccordionContent>
          Cósmica: azul profundo, marinho, turquesa e lilás claro.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Quais fontes usamos?</AccordionTrigger>
        <AccordionContent>Poppins — família única para todo o sistema.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
