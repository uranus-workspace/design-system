'use client';
import { StatCard } from '@uranus-workspace/blocks';
import { TrendingUp } from 'lucide-react';

export default function StatCardDefault() {
  return (
    <div className="w-full max-w-sm">
      <StatCard
        label="Receita"
        value="R$ 42.180"
        icon={<TrendingUp className="size-4" aria-hidden />}
        delta={{ value: '+8%', direction: 'up', label: 'mês' }}
      />
    </div>
  );
}
