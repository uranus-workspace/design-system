'use client';
import { StatCard, StatGrid } from '@uranus-workspace/blocks';
import { Users } from 'lucide-react';

export default function StatGridDefault() {
  return (
    <StatGrid columns={3}>
      <StatCard label="Usuários" value="1.2k" icon={<Users aria-hidden className="size-4" />} />
      <StatCard label="Ativos" value="892" />
      <StatCard label="Novos" value="34" intent="positive" />
    </StatGrid>
  );
}
