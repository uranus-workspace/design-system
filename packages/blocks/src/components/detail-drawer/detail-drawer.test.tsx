import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { DetailDrawer } from './detail-drawer.js';

describe('DetailDrawer', () => {
  it('renders title, description, body and footer when open', () => {
    render(
      <DetailDrawer
        open
        onOpenChange={() => {}}
        title="Customer details"
        description="Created on Jan 12, 2025"
        footer={<button type="button">Save</button>}
      >
        <p>Body</p>
      </DetailDrawer>,
    );
    expect(screen.getByText('Customer details')).toBeInTheDocument();
    expect(screen.getByText('Created on Jan 12, 2025')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders headerActions slot to the right of the title', () => {
    render(
      <DetailDrawer
        open
        onOpenChange={() => {}}
        title="Customer"
        headerActions={<button type="button">Edit</button>}
      >
        Body
      </DetailDrawer>,
    );
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('has no a11y violations when open', async () => {
    const { container } = render(
      <DetailDrawer
        open
        onOpenChange={() => {}}
        title="Customer details"
        description="Created on Jan 12, 2025"
      >
        Body
      </DetailDrawer>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
