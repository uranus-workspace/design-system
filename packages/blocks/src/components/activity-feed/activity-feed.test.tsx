import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { ActivityFeed } from './activity-feed.js';

describe('ActivityFeed', () => {
  it('renders an ordered list of activity items via composition', () => {
    render(
      <ActivityFeed>
        <ActivityFeed.Item
          actor={{ name: 'Alice Costa' }}
          action="criou"
          target="Projeto Apollo"
          timestamp="há 2 minutos"
        />
        <ActivityFeed.Item
          actor={{ name: 'Bruno Lima' }}
          action="aprovou"
          target="PR #142"
          timestamp="há 1 hora"
        />
      </ActivityFeed>,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Alice Costa')).toBeInTheDocument();
    expect(screen.getByText('Projeto Apollo')).toBeInTheDocument();
    expect(screen.getByText('há 2 minutos')).toBeInTheDocument();
  });

  it('renders the empty state slot when there are no items', () => {
    render(
      <ActivityFeed.Empty>
        <p className="text-sm text-muted-foreground">Sem atividades ainda.</p>
      </ActivityFeed.Empty>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Sem atividades ainda.');
  });

  it('uses provided initials when present', () => {
    render(
      <ActivityFeed>
        <ActivityFeed.Item
          actor={{ name: 'Alice', initials: 'AC' }}
          action="criou"
          timestamp="agora"
        />
      </ActivityFeed>,
    );
    expect(screen.getByText('AC')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <ActivityFeed>
        <ActivityFeed.Item
          actor={{ name: 'Alice Costa' }}
          action="criou"
          target="Projeto Apollo"
          timestamp="há 2 minutos"
        />
      </ActivityFeed>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
