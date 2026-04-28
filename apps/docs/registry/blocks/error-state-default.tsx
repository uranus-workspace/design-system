import { ErrorState } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';

export default function ErrorStateDefault() {
  return (
    <ErrorState
      title="Algo deu errado"
      description="Não foi possível carregar os dados."
      actions={<Button variant="outline">Tentar novamente</Button>}
    />
  );
}
