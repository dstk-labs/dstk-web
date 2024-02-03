export type NavbarProps = React.ComponentProps<'div'>;

export const Navbar = ({ children, ...props }: NavbarProps) => {
    return (
        <div className='border-b border-tremor-border dark:border-dark-tremor-border' {...props}>
            <div className='px-4 sm:px-6 lg:px-8'>
                <div className='overflow flex h-16 sm:space-x-7'>{children}</div>
            </div>
        </div>
    );
};
