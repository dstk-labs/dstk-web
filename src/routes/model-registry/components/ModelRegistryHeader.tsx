import { Button, Text, TextInput } from '@tremor/react';
import { useSetAtom } from 'jotai';
import type { NavigateFunction } from 'react-router-dom';

import { DataView } from '@/components/data-view';
import { VerticalDivider } from '@/components/vertical-divider';

import { modelRegistryPaginationAtom } from '../atoms';

type ModelRegistryHeaderProps = {
    navigateFn: NavigateFunction;
};

export const ModelRegistryHeader = ({ navigateFn }: ModelRegistryHeaderProps) => {
    const setInputs = useSetAtom(modelRegistryPaginationAtom);

    const handleInput = (input: string) =>
        setInputs((values) => ({
            ...values,
            modelName: input,
        }));

    return (
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0'>
            <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                Model Registry
            </Text>
            <div className='flex flex-col gap-4 md:flex-row md:items-center'>
                <div className='flex items-center gap-4'>
                    <TextInput
                        onChange={(e) => handleInput(e.target.value)}
                        placeholder='Search Models'
                    />
                    <VerticalDivider className='hidden md:block' />
                    <DataView />
                </div>
                <VerticalDivider className='hidden md:block' />
                <Button onClick={() => navigateFn('/dashboard/models/create')}>Add Model</Button>
            </div>
        </div>
    );
};
