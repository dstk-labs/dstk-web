import {
    ArrowRightEndOnRectangleIcon,
    ChevronRightIcon,
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/outline';
import { Button, Tab, TabGroup, TabList } from '@tremor/react';
import { Link, Outlet, useMatches, type UIMatch } from 'react-router-dom';

import { useTheme } from '@/hooks/theme';
import { useLogout } from '@/hooks';

import { GitHubIcon } from '../icons';
import { Logo } from '../logo';

const ROUTES = [
    {
        index: 0,
        name: 'Home',
        to: '/dashboard/home',
    },
    {
        index: 1,
        name: 'Model Registry',
        to: '/dashboard/models',
    },
    {
        index: 2,
        name: 'Teams',
        to: '/dashboard/teams',
    },
    {
        index: 3,
        name: 'Projects',
        to: '/dashboard/projects',
    },
];

export const DashboardLayout = () => {
    // Am I a frontend engineer yet?
    const matches = useMatches() as UIMatch<unknown, { crumb: (data?: unknown) => string }>[];

    const activeSection = matches[2];

    const crumbs = matches
        .filter((match) => Boolean(match.handle))
        .map((match) => ({
            href: match.pathname,
            label: match.handle.crumb(match.data),
        }));

    const currentIndex = ROUTES.find((route) => route.to === activeSection.pathname)?.index;

    const { theme, setTheme } = useTheme();

    const logout = useLogout();

    return (
        <div className='min-h-screen flex flex-col py-4 sm:py-6 lg:py-8'>
            {/* Header */}
            <div className='flex flex-col'>
                <div className='flex items-center justify-between px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center gap-2'>
                        <Logo />
                        <h1 className='text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                            Data Science Toolkit
                        </h1>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button icon={GitHubIcon} variant='light' />
                        <div className='h-5 border-l border-tremor-border dark:border-dark-tremor-border border-1' />
                        <Button
                            className={theme === 'light' ? 'text-tremor-brand-emphasis' : ''}
                            icon={SunIcon}
                            onClick={() => setTheme('light')}
                            variant='light'
                        />
                        <Button
                            className={
                                theme === 'dark' ? 'dark:text-dark-tremor-brand-emphasis' : ''
                            }
                            icon={MoonIcon}
                            onClick={() => setTheme('dark')}
                            variant='light'
                        />
                        <Button
                            className={
                                theme === 'system'
                                    ? 'text-tremor-brand-emphasis dark:text-dark-tremor-brand-emphasis'
                                    : ''
                            }
                            icon={ComputerDesktopIcon}
                            onClick={() => setTheme('system')}
                            variant='light'
                        />
                        <div className='h-5 border-l border-tremor-border dark:border-dark-tremor-border border-1' />
                        <Button
                            icon={ArrowRightEndOnRectangleIcon}
                            onClick={() => logout()}
                            tooltip='Logout'
                            variant='light'
                        />
                    </div>
                </div>
                {/* Navigation Menu */}
                <TabGroup className='pt-4' index={currentIndex}>
                    <TabList className='px-4 sm:px-6 lg:px-8'>
                        {ROUTES.map((route) => (
                            <Tab key={route.to}>
                                <Link to={route.to}>{route.name}</Link>
                            </Tab>
                        ))}
                    </TabList>
                </TabGroup>
                {/* Breadcrumb Menu */}
                <ol className='py-2 flex items-center text-sm leading-6 whitespace-nowrap min-w-0 px-6 border-b border-tremor-border dark:border-dark-tremor-border sm:px-8 lg:px-10'>
                    <li className='text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis'>
                        Dashboard
                    </li>
                    {crumbs.map((crumb) => (
                        <li
                            className='group flex items-center text-tremor-content-emphasis hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis dark:hover:text-dark-tremor-content-strong'
                            key={crumb.href}
                        >
                            {/* Yeah I CSS like that */}
                            <ChevronRightIcon className='h-4 w-4 mx-1 text-slate-400' />
                            <Link
                                className='text-sm group-last:font-semibold group-last:text-tremor-content-strong group-last:truncate group-last:dark:text-dark-tremor-content-strong'
                                to={crumb.href}
                            >
                                {crumb.label}
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
            <div className='grow py-6 bg-tremor-background-muted dark:bg-dark-tremor-background-muted'>
                {/* Page Content */}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
