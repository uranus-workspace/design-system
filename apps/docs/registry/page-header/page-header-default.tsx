import { PageHeader } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';
import { Plus } from 'lucide-react';

export default function PageHeaderDefault() {
  return (
    <PageHeader
      title="Projetos"
      description="Acompanhe iniciativas em aberto e crie novos projetos para sua equipe."
      actions={
        <Button>
          <Plus />
          Novo projeto
        </Button>
      }
      className="w-full"
    />
  );
}
