'use client';
import { AuthLayout } from '@uranus-workspace/blocks';
import { Button, Input, Label } from '@uranus-workspace/design-system';

export default function AuthLayoutDefault() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-fd-border">
      <AuthLayout
        variant="split"
        brandTone="nebula"
        brandPanel={
          <div className="flex h-full min-h-[280px] flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
                Uranus Technologies
              </p>
              <p className="mt-3 max-w-sm text-balance text-2xl font-semibold leading-tight text-primary-foreground">
                O hub de serviços flexível e escalável.
              </p>
            </div>
            <p className="max-w-xs text-sm text-primary-foreground/85">
              Tokens cósmicos, componentes prontos e acessibilidade como erro — não aviso.
            </p>
          </div>
        }
      >
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Entrar</h1>
              <p className="mt-1 text-sm text-muted-foreground">Use seu email corporativo.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-email">Email</Label>
              <Input id="demo-email" type="email" autoComplete="off" placeholder="voce@empresa.com.br" />
            </div>
            <Button type="submit" className="w-full">
              Continuar
            </Button>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
}
