import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { FormSection } from './form-section.js';

describe('FormSection', () => {
  it('renders heading, description, fields and footer', () => {
    render(
      <FormSection
        title="Perfil"
        description="Atualize suas informações pessoais."
        footer={<button type="button">Salvar</button>}
      >
        <input aria-label="Nome completo" />
      </FormSection>,
    );
    expect(screen.getByRole('heading', { name: 'Perfil', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Atualize suas informações pessoais.')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });

  it('links the section to the heading via aria-labelledby', () => {
    render(
      <FormSection title="Notificações">
        <input aria-label="Ativar" />
      </FormSection>,
    );
    const heading = screen.getByRole('heading', { name: 'Notificações' });
    const section = heading.closest('section');
    expect(section).toHaveAttribute('aria-labelledby', heading.id);
  });

  it('switches layout via data-layout attribute', () => {
    render(
      <FormSection title="Dividido" layout="split">
        <input aria-label="x" />
      </FormSection>,
    );
    const heading = screen.getByRole('heading', { name: 'Dividido' });
    expect(heading.closest('section')).toHaveAttribute('data-layout', 'split');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <FormSection title="Perfil" description="Descrição da seção.">
        <label>
          Nome
          <input />
        </label>
      </FormSection>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
