import { Button, ButtonGroup } from '@uranus-workspace/design-system';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ButtonGroupDefault() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <ChevronLeft />
        Anterior
      </Button>
      <Button variant="outline">Página 2 de 10</Button>
      <Button variant="outline">
        Próxima
        <ChevronRight />
      </Button>
    </ButtonGroup>
  );
}
