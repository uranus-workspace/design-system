'use client';

import { ForgotPasswordForm } from '@uranus-workspace/blocks';
import { Card, CardContent } from '@uranus-workspace/design-system';

export default function ForgotPasswordFormDefault() {
  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-md border-border/60 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <ForgotPasswordForm
            title="Esqueceu sua senha?"
            description="Informe seu email e enviaremos um link para redefinir sua senha."
            signInHref="#"
            onSubmit={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
