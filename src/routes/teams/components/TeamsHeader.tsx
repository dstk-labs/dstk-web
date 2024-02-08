import { Button, Text } from '@tremor/react';
import { Link } from 'react-router-dom';

import { DataView } from '@/components/data-view';
import { VerticalDivider } from '@/components/vertical-divider';

export const TeamsHeader = () => {
    return (
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0'>
            <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                Teams
            </Text>
            <div className='flex items-center justify-between gap-4 md:justify-normal'>
                <DataView />
                <VerticalDivider className='hidden md:block' />
                <Button>
                    <Link to='/dashboard/teams/create'>Create Team</Link>
                </Button>
            </div>
        </div>
    );
};
