import { cn } from '@/lib';

export type EmptyPlaceholderTitleProps = React.ComponentProps<'p'>;

export const EmptyPlaceholderTitle = ({
    children,
    className,
    ...props
}: EmptyPlaceholderTitleProps) => {
    return (
        <p
            className={cn(
                'text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong',
                className,
            )}
            {...props}
        >
            {children}
        </p>
    );
};
