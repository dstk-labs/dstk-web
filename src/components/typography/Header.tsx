import { cn } from '@/lib';

export type HeaderProps = React.ComponentProps<'h2'>;

export const Header = ({ children, className, ...props }: HeaderProps) => {
    return (
        <h2
            className={cn(
                'text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong',
                className,
            )}
            {...props}
        >
            {children}
        </h2>
    );
};
