import { FilterBar } from '@uranus-workspace/blocks';
import { Badge } from '@uranus-workspace/design-system';

export default function FilterBarDefault() {
  return (
    <FilterBar
      filters={[
        { id: 'a', label: 'Status: Ativo' },
        { id: 'b', label: <Badge variant="secondary">Plano Pro</Badge> },
      ]}
      onRemoveFilter={() => {}}
      onClearAll={() => {}}
    />
  );
}
