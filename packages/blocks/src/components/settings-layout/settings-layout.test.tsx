import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { SettingsLayout, type SettingsNavGroup } from './settings-layout.js';

const groups: SettingsNavGroup[] = [
  {
    label: 'Account',
    items: [
      { id: 'profile', label: 'Profile', href: '#profile', active: true },
      { id: 'security', label: 'Security', href: '#security' },
    ],
  },
  {
    label: 'Workspace',
    items: [{ id: 'team', label: 'Team', href: '#team' }],
  },
];

describe('SettingsLayout', () => {
  it('renders nav groups and items', () => {
    render(
      <SettingsLayout groups={groups}>
        <div>content</div>
      </SettingsLayout>,
    );
    expect(screen.getByRole('navigation', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Security' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Team' })).toBeInTheDocument();
  });

  it('marks the active item with aria-current="page"', () => {
    render(
      <SettingsLayout groups={groups}>
        <div>content</div>
      </SettingsLayout>,
    );
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Security' })).not.toHaveAttribute('aria-current');
  });

  it('renders the optional header slot above the rail', () => {
    render(
      <SettingsLayout groups={groups} header={<h1>Settings</h1>}>
        <div>content</div>
      </SettingsLayout>,
    );
    expect(screen.getByRole('heading', { name: 'Settings', level: 1 })).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <SettingsLayout groups={groups} header={<h1>Settings</h1>}>
        <div>content</div>
      </SettingsLayout>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('supports the compound API', () => {
    render(
      <SettingsLayout>
        <SettingsLayout.Header>
          <h1>Settings</h1>
        </SettingsLayout.Header>
        <SettingsLayout.Grid>
          <SettingsLayout.Nav>
            <SettingsLayout.Group label="Account">
              <SettingsLayout.Link href="#profile" active>
                Profile
              </SettingsLayout.Link>
              <SettingsLayout.Link href="#security">Security</SettingsLayout.Link>
            </SettingsLayout.Group>
          </SettingsLayout.Nav>
          <SettingsLayout.Panel>
            <div>panel content</div>
          </SettingsLayout.Panel>
        </SettingsLayout.Grid>
      </SettingsLayout>,
    );
    expect(screen.getByRole('navigation', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('panel content')).toBeInTheDocument();
  });
});
