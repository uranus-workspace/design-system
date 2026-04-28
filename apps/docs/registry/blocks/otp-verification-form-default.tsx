'use client';

import { OtpVerificationForm } from '@uranus-workspace/blocks';
import { Card, CardContent } from '@uranus-workspace/design-system';

export default function OtpVerificationFormDefault() {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardContent className="p-6 sm:p-8">
        <OtpVerificationForm
          title="Verificar código"
          description="Digite o código de 6 dígitos enviado ao seu email."
          onSubmit={() => {}}
          onResend={() => {}}
        />
      </CardContent>
    </Card>
  );
}
