'use client';

import { PlanPanel } from '@uranus-workspace/ai';

export default function PlanPanelDefault() {
  return (
    <div className="mx-auto w-full max-w-md">
      <PlanPanel
        stages={[
          { id: '1', title: 'Mapear superfícies de produto', status: 'done' },
          { id: '2', title: 'Listar componentes-chave', status: 'done' },
          {
            id: '3',
            title: 'Esboçar API de useUranusChat',
            status: 'running',
            description: 'Normalizando status entre AI SDK 5 e Uranus.',
          },
          { id: '4', title: 'Documentar fluxos compostos', status: 'queued' },
          { id: '5', title: 'Publicar changeset', status: 'queued' },
        ]}
      />
    </div>
  );
}
