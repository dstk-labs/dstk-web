import { cn } from '@/lib';

export type EmptyPlaceholderIconProps = React.ComponentProps<'svg'> & {
    Icon: React.ElementType;
};

export const EmptyPlaceholderIcon = ({ className, Icon, ...props }: EmptyPlaceholderIconProps) => {
    return (
        <Icon
            aria-hidden={true}
            className={cn(
                'mx-auto h-7 w-7 text-tremor-content-subtle dark:text-dark-tremor-content-subtle',
                className,
            )}
            {...props}
        />
    );
};
