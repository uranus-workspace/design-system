import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@uranus-workspace/design-system';
import { Activity, Bell, DollarSign, Folder, Home, Search, Settings, Users } from 'lucide-react';
import { ActivityFeed, type ActivityItem } from '../components/activity-feed/activity-feed.js';
import { AppHeader } from '../components/app-header/app-header.js';
import { AppShell } from '../components/app-shell/app-shell.js';
import { AppSidebar, type SidebarNavGroup } from '../components/app-sidebar/app-sidebar.js';
import { ChartCard } from '../components/chart-card/chart-card.js';
import { DataTable } from '../components/data-table/data-table.js';
import { FilterBar } from '../components/filter-bar/filter-bar.js';
import {
  type NotificationItem,
  NotificationList,
} from '../components/notification-list/notification-list.js';
import { PageHeader } from '../components/page-header/page-header.js';
import { StatCard } from '../components/stat-card/stat-card.js';
import { StatGrid } from '../components/stat-grid/stat-grid.js';

const meta: Meta = {
  title: 'Blocks/Compositions/Dashboard',
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
};
export default meta;
type Story = StoryObj;

const groups: SidebarNavGroup[] = [
  {
    label: 'Workspace',
    items: [
      { label: 'Dashboard', href: '#', icon: <Home aria-hidden />, active: true },
      { label: 'Projects', href: '#', icon: <Folder aria-hidden />, badge: '3' },
      { label: 'Team', href: '#', icon: <Users aria-hidden /> },
    ],
  },
  {
    label: 'Account',
    items: [{ label: 'Settings', href: '#', icon: <Settings aria-hidden /> }],
  },
];

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'invited' | 'paused';
  amount: number;
}

const customers: Customer[] = Array.from({ length: 12 }, (_, index) => ({
  id: String(index + 1),
  name: ['Alice', 'Bruno', 'Camila', 'Diego', 'Erika'][index % 5] ?? 'Felipe',
  email: `customer${index + 1}@uranus.com.br`,
  status: (['active', 'invited', 'paused'] as const)[index % 3] ?? 'active',
  amount: 250 + index * 73,
}));

const customerColumns: ColumnDef<Customer, unknown>[] = [
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row }) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        row.original.amount,
      ),
  },
];

const activeFilters = [
  { id: 'status', label: 'Status: Active' },
  { id: 'plan', label: 'Plan: Pro' },
];

const activityItems: ActivityItem[] = [
  {
    id: '1',
    actor: { name: 'Bruno' },
    action: 'criou um novo projeto',
    target: 'Apollo',
    timestamp: 'há 2m',
    icon: <Folder aria-hidden className="size-4" />,
  },
  {
    id: '2',
    actor: { name: 'Camila' },
    action: 'comentou em',
    target: 'Pull Request #142',
    timestamp: 'há 1h',
  },
  {
    id: '3',
    actor: { name: 'Sistema', initials: 'SY' },
    action: 'completou o deploy',
    target: 'main',
    timestamp: 'há 3h',
    icon: <Activity aria-hidden className="size-4" />,
  },
];

const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Novo comentário em Apollo',
    description: 'Bruno: ficou ótimo!',
    timestamp: 'há 2m',
    unread: true,
  },
  {
    id: '2',
    title: 'Build concluído',
    description: 'main passou em 2m31s',
    timestamp: 'há 1h',
  },
];

export const Empty: Story = {
  render: () => (
    <AppShell
      sidebar={<AppSidebar logo={<span className="font-semibold">Uranus</span>} groups={groups} />}
      header={
        <AppHeader
          breadcrumbs={
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>Workspace</li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">Dashboard</li>
            </ol>
          }
          searchTrigger={
            <Button variant="outline" size="sm" className="gap-2">
              <Search aria-hidden className="size-4" />
              <span>Search</span>
            </Button>
          }
          notifications={
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell aria-hidden className="size-4" />
            </Button>
          }
          userMenu={
            <Button variant="ghost" className="size-8 rounded-full p-0" aria-label="User menu">
              <Avatar className="size-8">
                <AvatarFallback>UT</AvatarFallback>
              </Avatar>
            </Button>
          }
        />
      }
    >
      <PageHeader
        title="Dashboard"
        description="A composição completa do shell - chrome + page header. Dados serão adicionados em fases seguintes."
      />
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Conteúdo da página vai aqui.</p>
      </div>
    </AppShell>
  ),
};

export const WithData: Story = {
  render: () => (
    <AppShell
      sidebar={<AppSidebar logo={<span className="font-semibold">Uranus</span>} groups={groups} />}
      header={
        <AppHeader
          breadcrumbs={
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>Workspace</li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">Dashboard</li>
            </ol>
          }
          searchTrigger={
            <Button variant="outline" size="sm" className="gap-2">
              <Search aria-hidden className="size-4" />
              <span>Search</span>
            </Button>
          }
          notifications={
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell aria-hidden className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <NotificationList items={notifications} onMarkAllRead={() => {}} />
              </PopoverContent>
            </Popover>
          }
          userMenu={
            <Button variant="ghost" className="size-8 rounded-full p-0" aria-label="User menu">
              <Avatar className="size-8">
                <AvatarFallback>UT</AvatarFallback>
              </Avatar>
            </Button>
          }
        />
      }
    >
      <PageHeader
        title="Dashboard"
        description="Visão consolidada do workspace — KPIs, atividade recente e clientes ativos."
        actions={<Button size="sm">Novo projeto</Button>}
      />
      <div className="flex flex-col gap-6 p-6">
        <StatGrid columns={4}>
          <StatCard
            label="Receita do mês"
            value="R$ 124.880"
            icon={<DollarSign aria-hidden className="size-4" />}
            delta={{ value: '+12,4%', direction: 'up', label: 'vs mês passado' }}
          />
          <StatCard
            label="Novos clientes"
            value="284"
            icon={<Users aria-hidden className="size-4" />}
            delta={{ value: '+8,1%', direction: 'up' }}
          />
          <StatCard
            label="Churn"
            value="2,3%"
            icon={<Activity aria-hidden className="size-4" />}
            delta={{ value: '+0,4 p.p.', direction: 'down' }}
            intent="negative"
          />
          <StatCard
            label="MRR"
            value="R$ 89.430"
            icon={<DollarSign aria-hidden className="size-4" />}
            delta={{ value: '0,0%', direction: 'neutral' }}
          />
        </StatGrid>

        <div className="grid gap-6 lg:grid-cols-3">
          <ChartCard
            title="Receita semanal"
            description="Últimas 8 semanas"
            className="lg:col-span-2"
          >
            <div className="flex h-48 items-end gap-2">
              {[40, 65, 50, 80, 70, 90, 75, 95].map((height, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static demo values
                  key={index}
                  className="flex-1 rounded bg-primary/80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </ChartCard>
          <ChartCard title="Atividade recente" description="Últimas movimentações">
            <ActivityFeed items={activityItems} />
          </ChartCard>
        </div>

        <div className="flex flex-col gap-3">
          <FilterBar filters={activeFilters} onRemoveFilter={() => {}} onClearAll={() => {}} />
          <DataTable
            data={customers}
            columns={customerColumns}
            caption="Clientes ativos"
            pageSize={5}
          />
        </div>
      </div>
    </AppShell>
  ),
};
