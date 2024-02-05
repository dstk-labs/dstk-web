import { cn } from '@/lib';

export type AlertDialogDescriptionProps = React.ComponentProps<'p'>;

export const AlertDialogDescription = ({
    children,
    className,
    ...props
}: AlertDialogDescriptionProps) => {
    return (
        <p
            className={cn(
                'mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content',
                className,
            )}
            {...props}
        >
            {children}
        </p>
    );
};
