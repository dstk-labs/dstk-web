import { Link } from 'react-router-dom';

import { cn } from '@/lib';

export type LogoProps = React.ComponentProps<'div'>;

export const Logo = ({ className, ...props }: LogoProps) => {
    return (
        <div className='hidden shrink-0 sm:flex sm:items-center'>
            <Link className='p-1.5' to='/dashboard/home'>
                <div className={cn('h-7 w-7 shrink-0 block dark:hidden', className)} {...props}>
                    <img alt='dstk logo' src='/dstkLogo.png' />
                </div>
                <div className={cn('h-7 w-7 shrink-0 hidden dark:block', className)} {...props}>
                    <img alt='dstk logo' src='/dstkLogoInverted.png' />
                </div>
            </Link>
        </div>
    );
};
