import { Kbd, KbdGroup } from '@uranus-workspace/design-system';

export default function KbdDefault() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Abrir a paleta de comandos com</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  );
}
