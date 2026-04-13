import { Alert, AlertDescription, AlertTitle } from '@uranus-workspace/design-system';
import { TriangleAlert } from 'lucide-react';

export default function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <TriangleAlert />
      <AlertTitle>Falha ao salvar</AlertTitle>
      <AlertDescription>
        Não foi possível publicar o rascunho. Verifique a conexão e tente novamente.
      </AlertDescription>
    </Alert>
  );
}
