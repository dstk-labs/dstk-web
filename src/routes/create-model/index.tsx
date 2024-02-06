import { Card, Divider, Text } from '@tremor/react';

import { useListStorageProviders, useListTeams } from '@/hooks';

import { CreateModelForm, CreateModelFormError, CreateModelFormLoading } from './components';

export const CreateModel = () => {
    const {
        data: storageProviders,
        loading: storageProvidersLoading,
        error: storageProvidersError,
    } = useListStorageProviders();
    const { data: teams, loading: teamsLoading, error: teamsError } = useListTeams();

    if (storageProvidersLoading || teamsLoading) {
        return <CreateModelFormLoading />;
    }

    if (storageProvidersError || teamsError) {
        return <CreateModelFormError />;
    }

    if (storageProviders && teams) {
        return (
            <div className='px-4 sm:px-6 lg:px-8'>
                <Card>
                    <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                        Create Model
                    </Text>
                    <Divider className='my-4' />
                    <CreateModelForm
                        storageProviders={storageProviders.listStorageProviders}
                        teams={teams.listTeams}
                    />
                </Card>
            </div>
        );
    }
};
