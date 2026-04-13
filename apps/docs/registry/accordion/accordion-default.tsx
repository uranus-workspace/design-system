'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@uranus-workspace/design-system';

export default function AccordionDefault() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>O que é o Uranus Design System?</AccordionTrigger>
        <AccordionContent>
          Um conjunto de tokens, componentes e padrões que mantém toda a plataforma Uranus
          consistente entre produtos.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Como instalo os pacotes?</AccordionTrigger>
        <AccordionContent>
          Adicione <code>@uranus-workspace/design-system</code> ao seu projeto e importe os
          componentes diretamente do barrel.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Posso customizar os componentes?</AccordionTrigger>
        <AccordionContent>
          Sim. Os componentes são código próprio baseado em shadcn/ui — edite-os conforme as
          necessidades do seu produto.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
