import { Button, Text } from '@tremor/react';
import { useNavigate } from 'react-router-dom';

import type { MLModelVersion } from '@/types/MLModelVersion';

type ModelVersionDetailsHeaderProps = {
    mlModelVersion: MLModelVersion;
};

export const ModelVersionDetailsHeader = ({ mlModelVersion }: ModelVersionDetailsHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0'>
            <div className='flex flex-col'>
                <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                    Model Metadata
                </Text>
                <div className='w-full md:max-w-7xl'>
                    <p className='text-tremor-label text-tremor-content dark:text-dark-tremor-content'>
                        {mlModelVersion.description}
                    </p>
                </div>
            </div>
            <Button onClick={() => navigate('/dashboard/models/create')}>Upload Files</Button>
        </div>
    );
};
