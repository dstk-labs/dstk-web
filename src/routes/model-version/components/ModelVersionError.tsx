import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Card } from '@tremor/react';

import {
    EmptyPlaceholder,
    EmptyPlaceholderContents,
    EmptyPlaceholderDescription,
    EmptyPlaceholderIcon,
    EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';

export const ModelVersionError = () => {
    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <Card>
                <EmptyPlaceholder className='mt-4 h-52'>
                    <EmptyPlaceholderContents>
                        <EmptyPlaceholderIcon className='h-7 w-7' Icon={ExclamationTriangleIcon} />
                        <EmptyPlaceholderTitle className='mt-2'>
                            Whoops! Trouble loading data from the server.
                        </EmptyPlaceholderTitle>
                        <EmptyPlaceholderDescription>
                            Did you try turning it on and off again?
                        </EmptyPlaceholderDescription>
                    </EmptyPlaceholderContents>
                </EmptyPlaceholder>
            </Card>
        </div>
    );
};
