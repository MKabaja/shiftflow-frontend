import { Card } from '@/shared/components/Card';
import { Skeleton } from '@/shared/components/Skeleton';

function NewsCardSkeleton() {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Skeleton
          variant="circle"
          className="size-5 shrink-0"
        />
        <Skeleton className="h-7.5 w-2/3" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton />
        <Skeleton />
        <Skeleton className="w-4/5" />
      </div>
      <Skeleton className="w-1/3" />
    </Card>
  );
}

export { NewsCardSkeleton };
