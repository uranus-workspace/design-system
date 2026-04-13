'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@uranus-workspace/design-system';

export default function AccordionMultiple() {
  return (
    <Accordion type="multiple" className="w-full max-w-md" defaultValue={['faturamento']}>
      <AccordionItem value="faturamento">
        <AccordionTrigger>Faturamento</AccordionTrigger>
        <AccordionContent>
          Veja faturas, métodos de pagamento e o histórico de cobranças da sua organização.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="equipe">
        <AccordionTrigger>Equipe</AccordionTrigger>
        <AccordionContent>Gerencie convites, papéis e permissões dos membros.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="seguranca">
        <AccordionTrigger>Segurança</AccordionTrigger>
        <AccordionContent>
          Configure autenticação em dois fatores, tokens de API e políticas de sessão.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
