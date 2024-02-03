export type NavbarItemsProps = React.ComponentProps<'nav'>;

export const NavbarItems = ({ children, ...props }: NavbarItemsProps) => {
    return (
        <nav className='-mb-px flex space-x-6' aria-label='Tabs' {...props}>
            {children}
        </nav>
    );
};
