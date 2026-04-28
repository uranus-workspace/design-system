import { AuthLayout } from '@uranus-workspace/blocks';
import { Button, Input, Label } from '@uranus-workspace/design-system';

export default function AuthLayoutDefault() {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-fd-border">
      <AuthLayout
        variant="split"
        brandPanel={<span className="text-2xl font-semibold text-primary-foreground">Uranus</span>}
      >
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="demo-email">Email</Label>
            <Input id="demo-email" type="email" autoComplete="off" />
          </div>
          <Button type="submit">Continuar</Button>
        </form>
      </AuthLayout>
    </div>
  );
}
