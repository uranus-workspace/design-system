import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Composer } from './composer.js';

describe('Composer.RecordButton', () => {
  it('renders an idle record button with accessible label', () => {
    render(
      <Composer.Root onSubmit={() => {}}>
        <Composer.Textarea aria-label="msg" />
        <Composer.RecordButton />
      </Composer.Root>,
    );
    expect(screen.getByRole('button', { name: 'Gravar áudio' })).toBeInTheDocument();
  });

  it('respects custom label', () => {
    render(
      <Composer.Root onSubmit={() => {}}>
        <Composer.Textarea aria-label="msg" />
        <Composer.RecordButton label="Falar com a Uranus" />
      </Composer.Root>,
    );
    expect(screen.getByRole('button', { name: 'Falar com a Uranus' })).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Composer.Root onSubmit={() => {}}>
        <Composer.Textarea aria-label="msg" />
        <Composer.RecordButton />
      </Composer.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
