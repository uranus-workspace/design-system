import { ScrollArea, Separator } from '@uranus-workspace/design-system';

const tags = Array.from({ length: 40 }, (_, i) => `Etiqueta ${String(i + 1).padStart(2, '0')}`);

export default function ScrollAreaDefault() {
  return (
    <ScrollArea className="h-60 w-64 rounded-md border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium leading-none">Etiquetas do projeto</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="py-1.5 text-sm">{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
