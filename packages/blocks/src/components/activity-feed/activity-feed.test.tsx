import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { ActivityFeed, type ActivityItem } from './activity-feed.js';

const items: ActivityItem[] = [
  {
    id: '1',
    actor: { name: 'Alice Costa' },
    action: 'created',
    target: 'Project Apollo',
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    actor: { name: 'Bruno Lima' },
    action: 'approved',
    target: 'PR #142',
    timestamp: '1 hour ago',
  },
];

describe('ActivityFeed', () => {
  it('renders an ordered list of activity items', () => {
    render(<ActivityFeed items={items} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Alice Costa')).toBeInTheDocument();
    expect(screen.getByText('Project Apollo')).toBeInTheDocument();
    expect(screen.getByText('2 minutes ago')).toBeInTheDocument();
  });

  it('renders the empty state when items is empty', () => {
    render(<ActivityFeed items={[]} />);
    expect(screen.getByRole('status')).toHaveTextContent('No activity yet.');
  });

  it('uses provided initials when present', () => {
    const item: ActivityItem = {
      id: 'x',
      actor: { name: 'Alice', initials: 'AC' },
      action: 'created',
      timestamp: 'now',
    };
    render(<ActivityFeed items={[item]} />);
    expect(screen.getByText('AC')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ActivityFeed items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('supports composition with Item children', () => {
    render(
      <ActivityFeed>
        <ActivityFeed.Item {...items[0]} />
        <ActivityFeed.Item {...items[1]} />
      </ActivityFeed>,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Alice Costa')).toBeInTheDocument();
  });
});
