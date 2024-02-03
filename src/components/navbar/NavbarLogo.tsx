export type NavbarLogoProps = React.ComponentProps<'div'>;

export const NavbarLogo = ({ children, ...props }: NavbarLogoProps) => {
    return (
        <div className='hidden shrink-0 sm:flex sm:items-center' {...props}>
            {children}
        </div>
    );
};
