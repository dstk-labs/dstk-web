import { Link, type LinkProps } from 'react-router-dom';

import { cn } from '@/lib';

export type NavbarItemProps = LinkProps & {
    isActive?: boolean;
};

export const NavbarItem = ({ children, to, isActive = false, ...props }: NavbarItemProps) => {
    return (
        <Link
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                isActive
                    ? 'dark:text-tremor-dark-brand border-tremor-brand text-tremor-brand'
                    : 'border-transparent text-tremor-content-emphasis hover:border-tremor-content-subtle hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis hover:dark:border-dark-tremor-content-subtle hover:dark:text-dark-tremor-content-strong',
                'inline-flex items-center whitespace-nowrap border-b-2 px-2 text-tremor-default font-medium',
            )}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};
