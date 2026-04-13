import { Button, Spinner } from '@uranus-workspace/design-system';

export default function ButtonLoading() {
  return (
    <Button disabled>
      <Spinner />
      Salvando…
    </Button>
  );
}
