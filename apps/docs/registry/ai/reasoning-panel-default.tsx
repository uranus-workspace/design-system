'use client';

import { ReasoningPanel } from '@uranus-workspace/ai';

const trace = `1. Identificar a pergunta do usuário sobre "streaming".
2. Confirmar que \`useUranusChat\` mapeia status do AI SDK para os nossos.
3. Formular resposta destacando \`UIMessage.parts\` e o pacote \`@uranus-workspace/ai\`.`;

export default function ReasoningPanelDefault() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <ReasoningPanel text={trace} defaultOpen />
    </div>
  );
}
