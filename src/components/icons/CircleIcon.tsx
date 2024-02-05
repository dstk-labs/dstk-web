import { cn } from '@/lib';

export type CircleIconProps = Pick<React.ComponentProps<'span'>, 'className'>;

export const CircleIcon = ({ className }: CircleIconProps) => {
    return (
        <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', className)} aria-hidden={true} />
    );
};
