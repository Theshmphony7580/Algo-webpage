import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="glass-card overflow-hidden h-full animate-pulse">
      <div className="aspect-square w-full bg-gradient-to-br from-primary/10 to-accent/10 shimmer" />
      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-6 flex-1 shimmer" />
          <Skeleton className="h-6 w-16 shimmer" />
        </div>
        <Skeleton className="h-4 w-full shimmer" />
        <Skeleton className="h-4 w-3/4 shimmer" />
      </div>
    </div>
  );
};
