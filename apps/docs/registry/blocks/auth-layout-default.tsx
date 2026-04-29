'use client';
import { AuthLayout, OAuthProviderButton, SignInForm } from '@uranus-workspace/blocks';
import { Sparkles } from 'lucide-react';

export default function AuthLayoutDefault() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-fd-border">
      <AuthLayout
        variant="split"
        brandTone="nebula"
        brandPanel={
          <div className="flex h-full min-h-[420px] flex-col justify-between gap-10 text-white">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <Sparkles aria-hidden className="size-4" />
              Uranus Technologies
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="max-w-md text-balance text-3xl font-semibold leading-tight text-white">
                O hub de serviços flexível e escalável.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-white/85">
                Tokens cósmicos, componentes prontos e acessibilidade como erro — não aviso. Em
                produção em poucos minutos.
              </p>
            </div>
            <figure className="flex flex-col gap-3 border-t border-white/15 pt-6">
              <blockquote className="text-sm leading-relaxed text-white/90">
                “Reduzimos o tempo de onboarding de novos engenheiros de meses para semanas com o
                Uranus.”
              </blockquote>
              <figcaption className="text-xs text-white/70">
                Maria Silva — VP de Engenharia, Apollo
              </figcaption>
            </figure>
          </div>
        }
      >
        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <SignInForm
            title="Entrar na sua conta"
            description="Use sua conta corporativa para acessar o workspace."
            socialProviders={
              <>
                <OAuthProviderButton provider="google" onClick={() => {}}>
                  Continuar com Google
                </OAuthProviderButton>
                <OAuthProviderButton provider="microsoft" onClick={() => {}}>
                  Continuar com Microsoft
                </OAuthProviderButton>
              </>
            }
            forgotPasswordHref="#"
            signUpHref="#"
            onSubmit={() => {}}
          />
        </div>
      </AuthLayout>
    </div>
  );
}
