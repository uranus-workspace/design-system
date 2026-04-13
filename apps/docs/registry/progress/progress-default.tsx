'use client';

import { Progress } from '@uranus-workspace/design-system';

export default function ProgressDefault() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span>Enviando arquivos</span>
        <span className="text-muted-foreground">60%</span>
      </div>
      <Progress value={60} aria-label="Progresso do envio" />
    </div>
  );
}
