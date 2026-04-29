import type { Meta, StoryObj } from '@storybook/react';
import { Message } from '../message/message.js';
import { MessageList } from './message-list.js';

const meta: Meta<typeof MessageList> = {
  title: 'AI/Mensagens/MessageList',
  component: MessageList,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MessageList>;

export const Default: Story = {
  render: () => (
    <div style={{ height: 480 }} className="flex flex-col">
      <MessageList scrollKey={6}>
        <Message role="user">
          <Message.Content>O que vocês fazem na Uranus?</Message.Content>
        </Message>
        <Message role="assistant" name="Uranus">
          <Message.Content>
            Construímos sistemas de IA aplicada — agentes, automações inteligentes e produtos
            full-stack. Posso te mostrar um caso?
          </Message.Content>
        </Message>
        <Message role="user">
          <Message.Content>Sim! Compartilhe um exemplo recente.</Message.Content>
        </Message>
        <Message role="assistant" name="Uranus">
          <Message.Content>
            Recentemente lançamos o OmniFisco, que combina ingestão de notas, classificação por LLM
            e fluxo de aprovação humano-no-loop em um único produto.
          </Message.Content>
        </Message>
      </MessageList>
    </div>
  ),
};
