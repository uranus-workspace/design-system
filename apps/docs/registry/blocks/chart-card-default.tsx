'use client';
import { ChartCard } from '@uranus-workspace/blocks';

export default function ChartCardDefault() {
  return (
    <ChartCard title="Série temporal" description="Últimos 7 dias" className="w-full max-w-md">
      <div className="flex h-32 items-end gap-1">
        {[40, 55, 45, 70, 60, 80, 65].map((h, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static demo
            key={i}
            className="flex-1 rounded-sm bg-primary/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </ChartCard>
  );
}
