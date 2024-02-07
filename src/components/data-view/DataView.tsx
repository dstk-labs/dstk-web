import { RiLayoutGridLine, RiListUnordered } from '@remixicon/react';
import { Tab, TabList } from '@tremor/react';

import { cn } from '@/lib';

const TABS = [
    {
        icon: RiLayoutGridLine,
    },
    {
        icon: RiListUnordered,
    },
];

export type DataViewProps = Omit<React.ComponentProps<typeof TabList>, 'children'>;

export const DataView = ({ className, ...props }: DataViewProps) => {
    return (
        <TabList
            className={cn('bg-transparent dark:bg-transparent', className)}
            variant='solid'
            {...props}
        >
            {TABS.map((tab, index) => (
                <Tab
                    className='flex h-8 items-center text-tremor-content-emphasis'
                    key={index}
                    icon={tab.icon}
                />
            ))}
        </TabList>
    );
};
