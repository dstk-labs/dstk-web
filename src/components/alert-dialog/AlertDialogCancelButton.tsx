import { cn } from '@/lib';

export type AlertDialogCancelButtonProps = React.ComponentProps<'button'> & { onClose: () => void };

export const AlertDialogCancelButton = ({
    children,
    className,
    onClose,
    ...props
}: AlertDialogCancelButtonProps) => {
    return (
        <button
            className={cn(
                'whitespace-nowrap rounded-tremor-small px-4 py-2 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong',
                className,
            )}
            {...props}
            onClick={onClose}
        >
            {children}
        </button>
    );
};
