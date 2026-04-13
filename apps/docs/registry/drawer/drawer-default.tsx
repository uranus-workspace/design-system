'use client';

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@uranus-workspace/design-system';

export default function DrawerDefault() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Ver detalhes do pedido</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Pedido #4829</DrawerTitle>
            <DrawerDescription>
              Criado em 14 de abril, com entrega prevista para sexta-feira.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4 text-sm">
            <ul className="divide-y">
              <li className="flex justify-between py-2">
                <span>Plano Profissional</span>
                <span className="font-medium">R$ 149,00</span>
              </li>
              <li className="flex justify-between py-2">
                <span>Assentos adicionais (3)</span>
                <span className="font-medium">R$ 87,00</span>
              </li>
              <li className="flex justify-between py-2 font-semibold">
                <span>Total</span>
                <span>R$ 236,00</span>
              </li>
            </ul>
          </div>
          <DrawerFooter>
            <Button>Confirmar pedido</Button>
            <DrawerClose asChild>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
