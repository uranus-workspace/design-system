import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@uranus-workspace/design-system';

const invoices = [
  { id: 'INV-001', status: 'Pago', method: 'Cartão de crédito', amount: 'R$ 2.500,00' },
  { id: 'INV-002', status: 'Pendente', method: 'Pix', amount: 'R$ 1.200,00' },
  { id: 'INV-003', status: 'Atrasado', method: 'Boleto', amount: 'R$ 890,00' },
];

export default function TableDefault() {
  return (
    <Table className="w-[560px]">
      <TableCaption>Faturas recentes do projeto Apollo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fatura</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Método</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
