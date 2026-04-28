import { UsageCard } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';

export default function UsageCardDefault() {
  return (
    <UsageCard
      label="API calls"
      used={72_000}
      limit={100_000}
      unit="req/mês"
      cta={
        <Button size="sm" variant="outline">
          Ver detalhes
        </Button>
      }
    />
  );
}
