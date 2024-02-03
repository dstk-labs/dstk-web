export const Logo = () => {
    return (
        <div className='hidden shrink-0 sm:flex sm:items-center'>
            <a href='/dashboard/home' className='p-1.5'>
                <div className='h-7 w-7 shrink-0 block dark:hidden'>
                    <img alt='dstk logo' src='/dstkLogo.png' />
                </div>
                <div className='h-7 w-7 shrink-0 hidden dark:block'>
                    <img alt='dstk logo' src='/dstkLogoInverted.png' />
                </div>
            </a>
        </div>
    );
};
