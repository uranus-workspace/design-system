import { Spinner } from '@uranus-workspace/design-system';

export default function SpinnerDefault() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-8 text-primary" />
    </div>
  );
}
