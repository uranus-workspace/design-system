import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table.js';

const meta: Meta<typeof Table> = {
  title: 'Primitives/Table',
  component: Table,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Table>;

const rows = [
  { id: 'INV-001', plan: 'Starter', amount: 'R$ 49' },
  { id: 'INV-002', plan: 'Growth', amount: 'R$ 199' },
  { id: 'INV-003', plan: 'Enterprise', amount: 'R$ 1.299' },
];

export const Default: Story = {
  render: () => (
    <Table className="w-[480px]">
      <TableCaption>Faturas recentes da Uranus</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fatura</TableHead>
          <TableHead>Plano</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.plan}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
