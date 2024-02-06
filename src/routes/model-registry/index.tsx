import { Card, Divider, TabGroup, TabPanel, TabPanels } from '@tremor/react';
import { useNavigate } from 'react-router-dom';

import { useListModels } from './api';
import {
    ArchiveModal,
    ModelRegistryCards,
    ModelRegistryCardsLoading,
    ModelRegistryError,
    ModelRegistryHeader,
    ModelRegistryPagination,
    ModelRegistryTable,
    ModelRegistryTableLoading,
} from './components';

export const ModelRegistry = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useListModels();

    if (error) {
        return <ModelRegistryError />;
    }

    const Models = () => {
        if (loading || (data && data.listMLModels)) {
            return (
                <TabPanels>
                    <TabPanel>
                        {loading ? (
                            <ModelRegistryCardsLoading />
                        ) : (
                            data && <ModelRegistryCards mlModelList={data} navigateFn={navigate} />
                        )}
                    </TabPanel>
                    <TabPanel>
                        {loading ? (
                            <ModelRegistryTableLoading />
                        ) : (
                            data && <ModelRegistryTable mlModelList={data} navigateFn={navigate} />
                        )}
                    </TabPanel>
                </TabPanels>
            );
        }
    };

    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <Card>
                <TabGroup>
                    <ModelRegistryHeader navigateFn={navigate} />
                    <Divider className='my-4' />
                    <Models />
                </TabGroup>
                <div className='mt-4'>
                    <Divider />
                    {data && (
                        <ModelRegistryPagination
                            continuationToken={data.listMLModels.pageInfo.continuationToken}
                        />
                    )}
                </div>
            </Card>
            <ArchiveModal />
        </div>
    );
};
