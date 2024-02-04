import { cn } from '@/lib';

export type AvatarProps = Pick<React.ComponentProps<'svg'>, 'children' | 'className'>;

export const Avatar = ({ children, className }: AvatarProps) => {
    return (
        <span
            className={cn(
                'flex shrink-0 items-center justify-center rounded-tremor-full border border-tremor-border bg-tremor-background text-tremor-label text-tremor-content-emphasis dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-emphasis',
                className,
            )}
            aria-hidden={true}
        >
            {children}
        </span>
    );
};
