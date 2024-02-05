import { cn } from '@/lib';

export type EmptyPlaceholderDescriptionProps = React.ComponentProps<'p'>;

export const EmptyPlaceholderDescription = ({
    children,
    className,
    ...props
}: EmptyPlaceholderDescriptionProps) => {
    return (
        <p
            className={cn(
                'text-tremor-default text-tremor-content dark:text-dark-tremor-content',
                className,
            )}
            {...props}
        >
            {children}
        </p>
    );
};
