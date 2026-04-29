'use client';

import { ResetPasswordForm } from '@uranus-workspace/blocks';
import { Card, CardContent } from '@uranus-workspace/design-system';

export default function ResetPasswordFormDefault() {
  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-md border-border/60 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <ResetPasswordForm
            title="Definir nova senha"
            description="Escolha uma senha forte com ao menos 8 caracteres."
            onSubmit={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
