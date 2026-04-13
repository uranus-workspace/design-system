import { Alert, AlertDescription, AlertTitle } from '@uranus-workspace/design-system';
import { Info } from 'lucide-react';

export default function AlertDefault() {
  return (
    <Alert className="max-w-md">
      <Info />
      <AlertTitle>Atualização disponível</AlertTitle>
      <AlertDescription>
        A versão 2.4 do workspace acabou de ser publicada. Atualize para receber as novas correções.
      </AlertDescription>
    </Alert>
  );
}
