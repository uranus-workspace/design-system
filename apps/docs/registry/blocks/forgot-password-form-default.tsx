'use client';

import { ForgotPasswordForm } from '@uranus-workspace/blocks';
import { Card, CardContent } from '@uranus-workspace/design-system';

export default function ForgotPasswordFormDefault() {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardContent className="p-6 sm:p-8">
        <ForgotPasswordForm
          title="Esqueceu a senha?"
          description="Informe seu email e enviaremos um link para redefinir."
          onSubmit={() => {}}
          signInHref="#"
        />
      </CardContent>
    </Card>
  );
}
