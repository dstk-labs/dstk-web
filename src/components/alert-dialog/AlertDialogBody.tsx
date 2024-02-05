import { cn } from '@/lib';

export type AlertDialogBodyProps = React.ComponentProps<'div'>;

export const AlertDialogBody = ({ children, className, ...props }: AlertDialogBodyProps) => {
    return (
        <div className={cn('mt-2', className)} {...props}>
            {children}
        </div>
    );
};
