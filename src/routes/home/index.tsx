import { RiAddFill } from '@remixicon/react';
import { Button, Card, Divider } from '@tremor/react';

import { cn } from '@/lib';
import { Avatar } from '@/components/avatar';
import { Header, Link, Text, Title } from '@/components/typography';

function ContentPlaceholder({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'relative h-full overflow-hidden rounded bg-gray-50 dark:bg-dark-tremor-background-subtle',
                className,
            )}
            {...props}
        >
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

/* Add the following API actions:
    - Get User by User ID (or get current user)
*/

export const Home = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-12'>
                <header>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                            <Avatar className='h-14 w-14'>SO</Avatar>
                            <div className='flex flex-col'>
                                <Title>Welcome back, Steve O</Title>
                                <Text className='leading-6'>odeastephen1@gmail.com</Text>
                            </div>
                        </div>
                        <Button icon={RiAddFill}>Create Project</Button>
                    </div>
                </header>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div className='flex flex-col gap-4'>
                        {[0, 1, 2, 3].map((placeholder) => (
                            <Card className='h-36 p-2' key={placeholder}>
                                <ContentPlaceholder />
                            </Card>
                        ))}
                        <div className='block sm:hidden'>
                            <Link to='/dashboard/projects'>See all projects</Link>
                        </div>
                    </div>
                    <Card>
                        <div className='h-full flex flex-col gap-2'>
                            <Header>Recent Activity</Header>
                            <Divider className='my-4' />
                            <ContentPlaceholder className='h-36 sm:h-0 sm:grow' />
                            <Divider className='my-4' />
                            <Link to='/dashboard/activity'>See All Activity</Link>
                        </div>
                    </Card>
                </div>
            </div>
            <div className='hidden sm:block'>
                <Link to='/dashboard/projects'>See All Projects</Link>
            </div>
        </div>
    );
};
