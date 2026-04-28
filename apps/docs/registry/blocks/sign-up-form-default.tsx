'use client';
import { SignUpForm } from '@uranus-workspace/blocks';

export default function SignUpFormDefault() {
  return (
    <SignUpForm
      title="Criar conta"
      onSubmit={() => {}}
      signInHref="#"
      termsLabel={<>Aceito os termos.</>}
    />
  );
}
