'use client';

import { OtpVerificationForm } from '@uranus-workspace/blocks';
import { Card, CardContent } from '@uranus-workspace/design-system';

export default function OtpVerificationFormDefault() {
  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-md border-border/60 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <OtpVerificationForm
            title="Verificar seu email"
            description="Enviamos um código de 6 dígitos para gustavo@uranus.com.br."
            onSubmit={() => {}}
            onResend={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
