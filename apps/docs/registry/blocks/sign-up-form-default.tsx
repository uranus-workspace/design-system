'use client';

import { SignUpForm } from '@uranus-workspace/blocks';
import { Card, CardContent } from '@uranus-workspace/design-system';

export default function SignUpFormDefault() {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardContent className="p-6 sm:p-8">
        <SignUpForm
          title="Criar conta"
          description="Preencha os dados para começar."
          onSubmit={() => {}}
          signInHref="#"
          termsLabel={<>Aceito os termos.</>}
        />
      </CardContent>
    </Card>
  );
}
