import { AspectRatio } from '@uranus-workspace/design-system';

export default function AspectRatioDefault() {
  return (
    <div className="w-[420px]">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border bg-muted">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
          <span className="text-sm font-medium text-muted-foreground">16 / 9</span>
        </div>
      </AspectRatio>
    </div>
  );
}
