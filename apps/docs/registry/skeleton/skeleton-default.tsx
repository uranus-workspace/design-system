import { Skeleton } from '@uranus-workspace/design-system';

export default function SkeletonDefault() {
  return (
    <div className="flex w-80 flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-3/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-11/12" />
      <Skeleton className="h-3 w-9/12" />
    </div>
  );
}
