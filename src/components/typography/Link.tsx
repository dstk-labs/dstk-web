import { Link as ReactRouterLink } from 'react-router-dom';

import { cn } from '@/lib';

export type LinkProps = React.ComponentProps<typeof ReactRouterLink>;

export const Link = ({ children, className, ...props }: LinkProps) => {
    return (
        <ReactRouterLink
            className={cn(
                'text-sm font-medium text-tremor-brand hover:text-tremor-brand-emphasis dark:text-dark-tremor-brand hover:dark:text-dark-tremor-brand-emphasis',
                className,
            )}
            {...props}
        >
            {children}
        </ReactRouterLink>
    );
};
