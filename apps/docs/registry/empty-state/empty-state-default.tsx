import { EmptyState } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';
import { FolderPlus } from 'lucide-react';

export default function EmptyStateDefault() {
  return (
    <EmptyState
      icon={<FolderPlus />}
      title="Nenhum projeto ainda"
      description="Crie seu primeiro projeto para começar a colaborar com a equipe."
      actions={<Button>Criar projeto</Button>}
    />
  );
}
