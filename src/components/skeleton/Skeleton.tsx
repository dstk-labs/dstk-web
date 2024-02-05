import { cn } from '@/lib';

export type SkeletonProps = React.ComponentProps<'div'>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
    return (
        <div
            className={cn(
                'animate-pulse rounded-tremor-small bg-tremor-background-muted dark:bg-dark-tremor-background-muted',
                className,
            )}
            {...props}
        />
    );
};
