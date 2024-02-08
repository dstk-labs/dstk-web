import { RiAddFill, RiBarChartFill } from '@remixicon/react';
import { Button } from '@tremor/react';
import { Link } from 'react-router-dom';

import {
    EmptyPlaceholder,
    EmptyPlaceholderContents,
    EmptyPlaceholderIcon,
    EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';

export const NoTeamsFound = () => {
    return (
        <EmptyPlaceholder className='mt-4 h-52'>
            <EmptyPlaceholderContents>
                <EmptyPlaceholderIcon className='h-7 w-7' Icon={RiBarChartFill} />
                <EmptyPlaceholderTitle className='mt-2'>No Teams Found</EmptyPlaceholderTitle>
                <EmptyPlaceholderContents>
                    Create a new team to get started.
                </EmptyPlaceholderContents>
                <Button className='mt-6' icon={RiAddFill}>
                    <Link to='/dashboard/teams/create'>Create Team</Link>
                </Button>
            </EmptyPlaceholderContents>
        </EmptyPlaceholder>
    );
};
