import { Separator } from '@uranus-workspace/design-system';

export default function SeparatorDefault() {
  return (
    <div className="w-[360px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Uranus Design System</h4>
        <p className="text-sm text-muted-foreground">
          Componentes reutilizáveis para produtos Uranus.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Documentação</div>
        <Separator orientation="vertical" />
        <div>Storybook</div>
        <Separator orientation="vertical" />
        <div>GitHub</div>
      </div>
    </div>
  );
}
