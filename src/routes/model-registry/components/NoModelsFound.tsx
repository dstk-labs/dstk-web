import { RiAddFill, RiBarChartFill } from '@remixicon/react';
import { Button } from '@tremor/react';
import { Link } from 'react-router-dom';

import {
    EmptyPlaceholder,
    EmptyPlaceholderContents,
    EmptyPlaceholderIcon,
    EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';

export const NoModelsFound = () => {
    return (
        <EmptyPlaceholder className='h-52'>
            <EmptyPlaceholderContents>
                <EmptyPlaceholderIcon className='h-7 w-7' Icon={RiBarChartFill} />
                <EmptyPlaceholderTitle className='mt-2'>No Models Found</EmptyPlaceholderTitle>
                <EmptyPlaceholderContents>
                    Please update the search criteria or create a new model
                </EmptyPlaceholderContents>
                <Link to='/dashboard/models/create'>
                    <Button className='mt-6' icon={RiAddFill}>
                        Create Model
                    </Button>
                </Link>
            </EmptyPlaceholderContents>
        </EmptyPlaceholder>
    );
};
