import { render, screen } from '@testing-library/react';
import { Button } from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './page-header.js';

describe('PageHeader', () => {
  it('renders title, description, breadcrumbs, and actions', () => {
    render(
      <PageHeader
        title="Projects"
        description="All Uranus projects you can access."
        breadcrumbs={<span>Home / Projects</span>}
        actions={<Button>New project</Button>}
      />,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByText('All Uranus projects you can access.')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New project' })).toBeInTheDocument();
  });

  it('renders as a banner landmark', () => {
    render(<PageHeader title="T" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <PageHeader title="Projects" description="desc" actions={<Button>New</Button>} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
