'use client';
import { ChartCard } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';

const series = [
  { day: 'Seg', value: 42 },
  { day: 'Ter', value: 58 },
  { day: 'Qua', value: 51 },
  { day: 'Qui', value: 74 },
  { day: 'Sex', value: 63 },
  { day: 'Sáb', value: 89 },
  { day: 'Dom', value: 71 },
];

export default function ChartCardDefault() {
  return (
    <ChartCard
      title="Receita semanal"
      description="Soma diária dos últimos 7 dias"
      actions={
        <Button variant="ghost" size="sm" type="button">
          Exportar
        </Button>
      }
      footer={
        <span className="text-xs text-muted-foreground">
          Total da semana: <strong className="font-medium text-foreground">R$ 44.860</strong>
        </span>
      }
      className="w-full max-w-xl"
    >
      <div className="flex h-64 items-end gap-2">
        {series.map((point) => (
          <div key={point.day} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-sm bg-primary/70 transition-all"
              style={{ height: `${point.value}%` }}
              aria-hidden
            />
            <span className="text-[10px] text-muted-foreground">{point.day}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
