import { Button, Text } from '@tremor/react';
import type { NavigateFunction } from 'react-router-dom';

import { DataView } from '@/components/data-view';
import { VerticalDivider } from '@/components/vertical-divider';

type ModelRegistryHeaderProps = {
    modelId: string;
    navigateFn: NavigateFunction;
};

export const ModelVersionHeader = ({ navigateFn, modelId }: ModelRegistryHeaderProps) => {
    return (
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0'>
            <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                Model Registry
            </Text>
            <div className='flex items-center justify-between gap-4 md:justify-normal'>
                <DataView />
                <VerticalDivider className='hidden md:block' />
                <Button onClick={() => navigateFn(`/dashboard/models/${modelId}/create`)}>
                    Add Model Version
                </Button>
            </div>
        </div>
    );
};
