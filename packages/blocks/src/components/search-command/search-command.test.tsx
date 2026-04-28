import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { SearchCommand, type SearchCommandGroupConfig } from './search-command.js';

beforeAll(() => {
  // jsdom does not implement Element.prototype.scrollIntoView; cmdk uses it
  // when an item becomes selected.
  if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});

const buildGroups = (selectSpy: () => void): SearchCommandGroupConfig[] => [
  {
    heading: 'Suggestions',
    items: [
      { id: 'home', label: 'Go home', onSelect: selectSpy, shortcut: 'G H' },
      { id: 'profile', label: 'Open profile', onSelect: () => {} },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { id: 'theme', label: 'Toggle theme', onSelect: () => {}, keywords: ['dark', 'light'] },
    ],
  },
];

describe('SearchCommand', () => {
  it('renders groups, items and shortcut when open', () => {
    render(
      <SearchCommand
        open
        onOpenChange={() => {}}
        groups={buildGroups(() => {})}
        shortcutBinding={false}
      />,
    );
    expect(screen.getByPlaceholderText(/Type a command/)).toBeInTheDocument();
    expect(screen.getByText('Go home')).toBeInTheDocument();
    expect(screen.getByText('Open profile')).toBeInTheDocument();
    expect(screen.getByText('G H')).toBeInTheDocument();
  });

  it('runs onSelect and closes the dialog when an item is chosen', async () => {
    const onOpenChange = vi.fn();
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchCommand
        open
        onOpenChange={onOpenChange}
        groups={buildGroups(onSelect)}
        shortcutBinding={false}
      />,
    );
    await user.click(screen.getByText('Go home'));
    expect(onSelect).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('binds cmd+k to toggle when shortcutBinding is enabled', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchCommand open={false} onOpenChange={onOpenChange} groups={buildGroups(() => {})} />,
    );
    await user.keyboard('{Meta>}k{/Meta}');
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('has no a11y violations when open', async () => {
    const { container } = render(
      <SearchCommand
        open
        onOpenChange={() => {}}
        groups={buildGroups(() => {})}
        shortcutBinding={false}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('supports compositional Group and Item', async () => {
    const onOpenChange = vi.fn();
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchCommand open onOpenChange={onOpenChange} shortcutBinding={false}>
        <SearchCommand.Group heading="Suggestions">
          <SearchCommand.Item value="home" onSelect={onSelect} shortcut="G H">
            Go home
          </SearchCommand.Item>
        </SearchCommand.Group>
      </SearchCommand>,
    );
    await user.click(screen.getByText('Go home'));
    expect(onSelect).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
