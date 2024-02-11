import { cn } from '@/lib';

export type TextProps = React.ComponentProps<'p'>;

export const Text = ({ children, className, ...props }: TextProps) => {
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
