'use client';

import { Message } from '@uranus-workspace/ai';

export default function MessageDefault() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-1 px-2">
      <Message role="user" timestamp="agora">
        <Message.Content>Como o pacote `@uranus-workspace/ai` lida com streaming?</Message.Content>
      </Message>
      <Message role="assistant" name="Uranus" timestamp="agora">
        <Message.Content>
          Ele expõe `useUranusChat`, que envolve o `useChat` do `@ai-sdk/react`, normaliza o status
          em `idle | thinking | streaming | …` e devolve mensagens prontas para o `MessageList`.
        </Message.Content>
      </Message>
    </div>
  );
}
