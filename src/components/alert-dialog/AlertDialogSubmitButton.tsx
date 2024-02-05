import { Button } from '@tremor/react';

import { cn } from '@/lib';

export type AlertDialogSubmitButtonProps = React.ComponentProps<typeof Button>;

export const AlertDialogSubmitButton = ({
    children,
    className,
    ...props
}: AlertDialogSubmitButtonProps) => {
    return (
        <Button
            className={cn(
                'border-none whitespace-nowrap rounded-tremor-small bg-red-500 px-3 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-red-600 dark:bg-red-500 dark:text-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-red-600 dark:border-none disabled:pointer-events-none',
                className,
            )}
            {...props}
        >
            {children}
        </Button>
    );
};
