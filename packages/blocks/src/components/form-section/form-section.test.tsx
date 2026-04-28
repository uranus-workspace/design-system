import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { FormSection } from './form-section.js';

describe('FormSection', () => {
  it('renders heading, description, fields and footer', () => {
    render(
      <FormSection
        title="Profile"
        description="Update your personal info."
        footer={<button type="button">Save</button>}
      >
        <input aria-label="Full name" />
      </FormSection>,
    );
    expect(screen.getByRole('heading', { name: 'Profile', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Update your personal info.')).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('links the section to the heading via aria-labelledby', () => {
    render(
      <FormSection title="Notifications">
        <input aria-label="Enable" />
      </FormSection>,
    );
    const heading = screen.getByRole('heading', { name: 'Notifications' });
    const section = heading.closest('section');
    expect(section).toHaveAttribute('aria-labelledby', heading.id);
  });

  it('switches layout via data-layout attribute', () => {
    render(
      <FormSection title="Split" layout="split">
        <input aria-label="x" />
      </FormSection>,
    );
    const heading = screen.getByRole('heading', { name: 'Split' });
    expect(heading.closest('section')).toHaveAttribute('data-layout', 'split');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <FormSection title="Profile" description="Some description.">
        <label>
          Name
          <input />
        </label>
      </FormSection>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
