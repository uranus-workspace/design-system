'use client';

import { SuggestedPrompts } from '@uranus-workspace/ai';

const prompts = [
  {
    id: '1',
    title: 'Resumir uma reunião',
    description: 'Cole a transcrição e receba bullets acionáveis.',
    prompt: 'Resuma a reunião abaixo em bullets acionáveis com responsáveis.',
  },
  {
    id: '2',
    title: 'Planejar um experimento',
    description: 'Use modo plano para detalhar etapas.',
    prompt: 'Crie um plano detalhado para validar um novo onboarding.',
  },
  {
    id: '3',
    title: 'Pesquisar concorrentes',
    description: 'Modo pesquisa retorna fontes citadas.',
    prompt: 'Pesquise concorrentes diretos do produto X com fontes citadas.',
  },
  {
    id: '4',
    title: 'Reescrever com tom Uranus',
    description: 'Adapte qualquer texto ao guia editorial.',
    prompt: 'Reescreva o texto a seguir no tom da Uranus Technologies.',
  },
];

export default function SuggestedPromptsDefault() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <SuggestedPrompts prompts={prompts} onSelect={() => {}} />
    </div>
  );
}
