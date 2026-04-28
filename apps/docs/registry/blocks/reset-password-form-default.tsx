'use client';

import { ResetPasswordForm } from '@uranus-workspace/blocks';
import { Card, CardContent } from '@uranus-workspace/design-system';

export default function ResetPasswordFormDefault() {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardContent className="p-6 sm:p-8">
        <ResetPasswordForm
          title="Nova senha"
          description="Escolha uma senha forte para sua conta."
          onSubmit={() => {}}
        />
      </CardContent>
    </Card>
  );
}
