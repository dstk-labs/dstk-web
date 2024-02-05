import { cn } from '@/lib';

export type AlertDialogTitleProps = React.ComponentProps<'h4'>;

export const AlertDialogTitle = ({ children, className, ...props }: AlertDialogTitleProps) => {
    return (
        <h4
            className={cn(
                'font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong',
                className,
            )}
            {...props}
        >
            {children}
        </h4>
    );
};
