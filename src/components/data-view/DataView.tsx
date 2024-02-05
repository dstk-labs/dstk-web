import { RiLayoutGridLine, RiListUnordered } from '@remixicon/react';
import { Tab, TabList } from '@tremor/react';

const TABS = [
    {
        icon: RiLayoutGridLine,
    },
    {
        icon: RiListUnordered,
    },
];

export const DataView = () => {
    return (
        <TabList className='-mr-3 w-[135px] bg-transparent dark:bg-transparent' variant='solid'>
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
