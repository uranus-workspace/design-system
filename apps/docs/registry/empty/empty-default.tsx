import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@uranus-workspace/design-system';
import { Inbox } from 'lucide-react';

export default function EmptyDefault() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>Nenhuma mensagem ainda</EmptyTitle>
        <EmptyDescription>
          Quando alguém te enviar algo, ele aparece aqui em tempo real.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Convidar um colega</Button>
      </EmptyContent>
    </Empty>
  );
}
