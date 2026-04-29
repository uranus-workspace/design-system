'use client';
import { ChartCard } from '@uranus-workspace/blocks';
import {
  Button,
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@uranus-workspace/design-system';
import { Download } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const series = [
  { day: 'Seg', revenue: 4200 },
  { day: 'Ter', revenue: 5800 },
  { day: 'Qua', revenue: 5100 },
  { day: 'Qui', revenue: 7400 },
  { day: 'Sex', revenue: 6300 },
  { day: 'Sáb', revenue: 8900 },
  { day: 'Dom', revenue: 7160 },
];

const config = {
  revenue: { label: 'Receita', color: 'var(--color-primary)' },
} satisfies ChartConfig;

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const total = series.reduce((sum, point) => sum + point.revenue, 0);

export default function ChartCardDefault() {
  return (
    <ChartCard
      title="Receita semanal"
      description="Soma diária dos últimos 7 dias"
      actions={
        <Button variant="ghost" size="sm" type="button" className="gap-1.5">
          <Download aria-hidden className="size-4" />
          Exportar
        </Button>
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            Total da semana:{' '}
            <strong className="font-medium text-foreground">{currency.format(total)}</strong>
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">+12,4% vs anterior</span>
        </div>
      }
      className="w-full max-w-2xl"
    >
      <ChartContainer config={config} className="h-64 w-full">
        <AreaChart data={series} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="chart-card-revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={56}
            tickMargin={4}
            tickFormatter={(value: number) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="dot"
                formatter={(value, _name, item) => (
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span
                        aria-hidden
                        className="size-2 rounded-full"
                        style={{ background: item.color }}
                      />
                      Receita
                    </span>
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      {currency.format(Number(value))}
                    </span>
                  </div>
                )}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            fill="url(#chart-card-revenue)"
          />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
}
