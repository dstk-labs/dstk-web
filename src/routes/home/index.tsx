import { Avatar } from '@/components/avatar';
import { RiAddFill } from '@remixicon/react';
import { Button, Card } from '@tremor/react';
import { Link } from 'react-router-dom';

function ContentPlaceholder() {
    return (
        <div className='relative h-full overflow-hidden rounded bg-gray-50 dark:bg-dark-tremor-background-subtle'>
            <svg
                className='absolute inset-0 h-full w-full stroke-gray-200 dark:stroke-gray-700'
                fill='none'
            >
                <defs>
                    <pattern
                        id='pattern-1'
                        x='0'
                        y='0'
                        width='10'
                        height='10'
                        patternUnits='userSpaceOnUse'
                    >
                        <path d='M-3 13 15-5M-5 5l18-18M-1 21 17 3'></path>
                    </pattern>
                </defs>
                <rect stroke='none' fill='url(#pattern-1)' width='100%' height='100%'></rect>
            </svg>
        </div>
    );
}

export const Home = () => {
    return (
        <>
            <div className='flex flex-col gap-12 px-4 sm:px-6 lg:px-8'>
                <header>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                            <Avatar className='h-14 w-14'>SO</Avatar>
                            <div className='flex flex-col'>
                                <h3 className='text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                    Welcome back, Steve O
                                </h3>
                                <p className='text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content'>
                                    odeastephen1@gmail.com
                                </p>
                            </div>
                        </div>
                        <Button icon={RiAddFill}>Create Project</Button>
                    </div>
                </header>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div className='flex flex-col gap-4'>
                        <Card className='h-36 rounded-tremor-small p-2'>
                            <ContentPlaceholder />
                        </Card>
                        <Card className='h-36 rounded-tremor-small p-2'>
                            <ContentPlaceholder />
                        </Card>
                        <Card className='h-36 rounded-tremor-small p-2'>
                            <ContentPlaceholder />
                        </Card>
                        <Card className='h-36 rounded-tremor-small p-2'>
                            <ContentPlaceholder />
                        </Card>
                        <div className='block sm:hidden'>
                            <Button variant='light'>
                                <Link to='/dashboard/projects'>See all projects</Link>
                            </Button>
                        </div>
                    </div>
                    <Card className='flex flex-col rounded-tremor-small p-0'>
                        <div className='border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border'>
                            <h3 className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                Recent Activity
                            </h3>
                        </div>
                        <div className='h-36 sm:h-0 sm:grow p-2'>
                            <ContentPlaceholder />
                        </div>
                        <div className='border-t border-tremor-border px-4 py-2 dark:border-dark-tremor-border'>
                            <Button variant='light'>
                                <Link to='/dashboard/activity'>See All Activity</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
            <div className='hidden sm:block mt-4 px-4 sm:px-6 lg:px-8'>
                <Button variant='light'>
                    <Link to='/dashboard/projects'>See all projects</Link>
                </Button>
            </div>
        </>
    );
};
