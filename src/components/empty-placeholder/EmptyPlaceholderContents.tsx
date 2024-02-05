import { cn } from '@/lib';

export type EmptyPlaceholderContentsProps = React.ComponentProps<'div'>;

export const EmptyPlaceholderContents = ({
    children,
    className,
    ...props
}: EmptyPlaceholderContentsProps) => {
    return (
        <div className={cn('text-center', className)} {...props}>
            {children}
        </div>
    );
};
