import { Card, Divider, Text } from '@tremor/react';
import { useParams } from 'react-router-dom';

import { useGetModel } from '@/hooks';

import {
    CreateModelVersionError,
    CreateModelVersionForm,
    CreateModelVersionLoading,
} from './components';

export const CreateModelVersion = () => {
    const { modelId } = useParams();

    const { data, loading, error } = useGetModel(modelId || '');

    if (loading) return <CreateModelVersionLoading />;

    if (error) return <CreateModelVersionError />;

    if (data) {
        return (
            <div className='px-4 sm:px-6 lg:px-8'>
                <Card>
                    <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                        Register New Model Version
                    </Text>
                    <Divider className='my-4' />
                    <CreateModelVersionForm modelId={modelId || ''} />
                </Card>
            </div>
        );
    }
};
