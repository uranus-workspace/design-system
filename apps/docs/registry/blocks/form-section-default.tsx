'use client';
import { FormSection } from '@uranus-workspace/blocks';
import { Button, Input, Label } from '@uranus-workspace/design-system';

export default function FormSectionDefault() {
  return (
    <FormSection
      title="Perfil"
      description="Dados visíveis para o time."
      footer={
        <div className="flex gap-2">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="demo-name">Nome</Label>
        <Input id="demo-name" defaultValue="Maria" />
      </div>
    </FormSection>
  );
}
