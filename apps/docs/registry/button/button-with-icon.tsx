import { Button } from '@uranus-workspace/design-system';
import { Plus } from 'lucide-react';

export default function ButtonWithIcon() {
  return (
    <Button>
      <Plus />
      Novo projeto
    </Button>
  );
}
