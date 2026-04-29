'use client';

import { AuthDivider, OAuthProviderButton, SignUpForm } from '@uranus-workspace/blocks';
import { Card, CardContent } from '@uranus-workspace/design-system';

function GoogleIcon() {
  return (
    <svg
      role="img"
      aria-label="Google"
      className="size-4"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Google</title>
      <path
        d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.232c1.89-1.741 2.981-4.305 2.981-7.351Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.964-.895 6.619-2.422l-3.232-2.51c-.895.6-2.04.955-3.387.955-2.605 0-4.81-1.76-5.596-4.123H3.064v2.59A9.997 9.997 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.404 13.9A6.005 6.005 0 0 1 6.09 12c0-.66.114-1.299.314-1.9V7.51H3.064A9.996 9.996 0 0 0 2 12c0 1.614.386 3.14 1.064 4.49l3.34-2.59Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.977c1.468 0 2.786.505 3.823 1.495l2.868-2.868C16.96 2.991 14.696 2 12 2A9.997 9.997 0 0 0 3.064 7.51l3.34 2.59C7.19 7.737 9.395 5.977 12 5.977Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg
      role="img"
      aria-label="Microsoft"
      className="size-4"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Microsoft</title>
      <path d="M11.4 11.4H2V2h9.4v9.4Z" fill="#F25022" />
      <path d="M22 11.4h-9.4V2H22v9.4Z" fill="#7FBA00" />
      <path d="M11.4 22H2v-9.4h9.4V22Z" fill="#00A4EF" />
      <path d="M22 22h-9.4v-9.4H22V22Z" fill="#FFB900" />
    </svg>
  );
}

export default function SignUpFormDefault() {
  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-md border-border/60 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <SignUpForm
            title="Criar sua conta"
            description="Comece em menos de um minuto, sem cartão de crédito."
            socialProviders={
              <>
                <OAuthProviderButton provider="google" onClick={() => {}}>
                  <GoogleIcon />
                  Continuar com Google
                </OAuthProviderButton>
                <OAuthProviderButton provider="microsoft" onClick={() => {}}>
                  <MicrosoftIcon />
                  Continuar com Microsoft
                </OAuthProviderButton>
                <AuthDivider label="ou continue com email" />
              </>
            }
            signInHref="#"
            termsLabel={<>Aceito os Termos de Serviço e a Política de Privacidade.</>}
            onSubmit={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
