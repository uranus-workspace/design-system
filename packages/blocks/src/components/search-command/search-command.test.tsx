import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { SearchCommand } from './search-command.js';

beforeAll(() => {
  // jsdom does not implement Element.prototype.scrollIntoView; cmdk uses it
  // when an item becomes selected.
  if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});

describe('SearchCommand', () => {
  it('renders groups, items and shortcut when open', () => {
    render(
      <SearchCommand open onOpenChange={() => {}} shortcutBinding={false}>
        <SearchCommand.Group heading="Sugestões">
          <SearchCommand.Item value="home" shortcut="G H">
            Ir para Início
          </SearchCommand.Item>
          <SearchCommand.Item value="profile">Abrir perfil</SearchCommand.Item>
        </SearchCommand.Group>
      </SearchCommand>,
    );
    expect(screen.getByPlaceholderText(/Digite um comando/)).toBeInTheDocument();
    expect(screen.getByText('Ir para Início')).toBeInTheDocument();
    expect(screen.getByText('Abrir perfil')).toBeInTheDocument();
    expect(screen.getByText('G H')).toBeInTheDocument();
  });

  it('runs onSelect and closes the dialog when an item is chosen', async () => {
    const onOpenChange = vi.fn();
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchCommand open onOpenChange={onOpenChange} shortcutBinding={false}>
        <SearchCommand.Group heading="Sugestões">
          <SearchCommand.Item value="home" onSelect={onSelect} shortcut="G H">
            Ir para Início
          </SearchCommand.Item>
        </SearchCommand.Group>
      </SearchCommand>,
    );
    await user.click(screen.getByText('Ir para Início'));
    expect(onSelect).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('binds cmd+k to toggle when shortcutBinding is enabled', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchCommand open={false} onOpenChange={onOpenChange}>
        <SearchCommand.Group heading="Sugestões">
          <SearchCommand.Item value="home">Ir para Início</SearchCommand.Item>
        </SearchCommand.Group>
      </SearchCommand>,
    );
    await user.keyboard('{Meta>}k{/Meta}');
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('has no a11y violations when open', async () => {
    const { container } = render(
      <SearchCommand open onOpenChange={() => {}} shortcutBinding={false}>
        <SearchCommand.Group heading="Sugestões">
          <SearchCommand.Item value="home">Ir para Início</SearchCommand.Item>
        </SearchCommand.Group>
      </SearchCommand>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
