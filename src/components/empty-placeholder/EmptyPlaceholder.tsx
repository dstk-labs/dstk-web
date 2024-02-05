import { cn } from '@/lib';

export type EmptyPlaceholderProps = React.ComponentProps<'div'>;

export const EmptyPlaceholder = ({ children, className, ...props }: EmptyPlaceholderProps) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center rounded-tremor-small border border-dashed border-tremor-border p-4 dark:border-dark-tremor-border',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};
