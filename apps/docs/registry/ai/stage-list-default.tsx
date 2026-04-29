'use client';

import { StageList } from '@uranus-workspace/ai';

export default function StageListDefault() {
  return (
    <div className="mx-auto w-full max-w-md rounded-md border bg-background p-4">
      <StageList
        stages={[
          { id: '1', title: 'Coletar requisitos', status: 'done' },
          {
            id: '2',
            title: 'Pesquisar fontes',
            status: 'running',
            description: 'Lendo /docs/ai',
          },
          { id: '3', title: 'Esboçar resposta', status: 'queued' },
          { id: '4', title: 'Revisar citações', status: 'queued' },
        ]}
      />
    </div>
  );
}
