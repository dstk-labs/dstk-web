import { Card, Divider, Text } from '@tremor/react';
import { useParams } from 'react-router-dom';

import { useGetModel, useListStorageProviders, useListTeams } from '@/hooks';

import { EditModelForm, EditModelFormError, EditModelFormLoading } from './components';

export const EditModel = () => {
    const { modelId } = useParams();

    const { data: model, loading: modelLoading, error: modelError } = useGetModel(modelId || '');
    const { data: teams, loading: teamsLoading, error: teamsError } = useListTeams();
    const {
        data: storageProviders,
        loading: storageProviderLoading,
        error: storageProviderError,
    } = useListStorageProviders();

    if (storageProviderLoading || modelLoading || teamsLoading) {
        return <EditModelFormLoading />;
    }

    if (storageProviderError || modelError || teamsError) {
        return <EditModelFormError />;
    }

    if (model && storageProviders && teams) {
        return (
            <div className='px-4 sm:px-6 lg:px-8'>
                <Card>
                    <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                        Edit {model.getMLModel.modelName}
                    </Text>
                    <Divider className='my-4' />
                    <EditModelForm
                        model={model.getMLModel}
                        storageProviders={storageProviders.listStorageProviders}
                        teams={teams.listTeams}
                    />
                </Card>
            </div>
        );
    }
};
