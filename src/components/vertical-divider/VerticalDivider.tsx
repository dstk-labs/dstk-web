import { cn } from '@/lib';

export type VerticalDividerProps = Omit<React.ComponentProps<'div'>, 'children'>;

export const VerticalDivider = ({ className, ...props }: VerticalDividerProps) => {
    return (
        <div
            className={cn('h-8 w-px bg-tremor-border dark:bg-dark-tremor-border', className)}
            {...props}
        />
    );
};
