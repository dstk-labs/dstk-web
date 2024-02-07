import { RiAddFill, RiBarChartFill } from '@remixicon/react';
import { Button } from '@tremor/react';

import {
    EmptyPlaceholder,
    EmptyPlaceholderContents,
    EmptyPlaceholderIcon,
    EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';

export const NoModelVersionsFound = () => {
    return (
        <EmptyPlaceholder className='mt-4 h-52'>
            <EmptyPlaceholderContents>
                <EmptyPlaceholderIcon className='h-7 w-7' Icon={RiBarChartFill} />
                <EmptyPlaceholderTitle className='mt-2'>
                    No Model Versions Found
                </EmptyPlaceholderTitle>
                <EmptyPlaceholderContents>
                    Create your first version to get started.
                </EmptyPlaceholderContents>
                <Button className='mt-6' icon={RiAddFill}>
                    Create Model Version
                </Button>
            </EmptyPlaceholderContents>
        </EmptyPlaceholder>
    );
};
