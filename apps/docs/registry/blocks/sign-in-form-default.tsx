'use client';

import { SignInForm } from '@uranus-workspace/blocks';
import { Card, CardContent } from '@uranus-workspace/design-system';

export default function SignInFormDefault() {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardContent className="p-6 sm:p-8">
        <SignInForm
          title="Entrar"
          description="Use sua conta corporativa."
          onSubmit={() => {}}
          forgotPasswordHref="#"
          signUpHref="#"
        />
      </CardContent>
    </Card>
  );
}
