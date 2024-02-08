import { RiAddFill, RiBarChartFill } from '@remixicon/react';
import { Button } from '@tremor/react';

import {
    EmptyPlaceholder,
    EmptyPlaceholderContents,
    EmptyPlaceholderIcon,
    EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';

export const NoObjects = () => {
    return (
        <EmptyPlaceholder className='mt-4 h-52'>
            <EmptyPlaceholderContents>
                <EmptyPlaceholderIcon className='h-7 w-7' Icon={RiBarChartFill} />
                <EmptyPlaceholderTitle className='mt-2'>No Files Found</EmptyPlaceholderTitle>
                <EmptyPlaceholderContents>
                    Please upload files to get started
                </EmptyPlaceholderContents>
                <Button className='mt-6' icon={RiAddFill}>
                    Upload Files
                </Button>
            </EmptyPlaceholderContents>
        </EmptyPlaceholder>
    );
};
