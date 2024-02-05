import { cn } from '@/lib';

export type LabelProps = React.ComponentProps<'label'>;

export const Label = ({ children, className, htmlFor, ...props }: LabelProps) => {
    return (
        <label
            className={cn(
                'font-medium text-sm text-tremor-content-strong dark:text-dark-tremor-content-strong',
                className,
            )}
            htmlFor={htmlFor}
            {...props}
        >
            {children}
        </label>
    );
};
