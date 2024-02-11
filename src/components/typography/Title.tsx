import { cn } from '@/lib';

export type TitleProps = React.ComponentProps<'h1'>;

export const Title = ({ children, className, ...props }: TitleProps) => {
    return (
        <h1
            className={cn(
                'text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong',
                className,
            )}
            {...props}
        >
            {children}
        </h1>
    );
};
