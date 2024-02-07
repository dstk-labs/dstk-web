import { Card, Divider, TabGroup, TabPanel, TabPanels } from '@tremor/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useListModelVersions } from './api';
import {
    ModelRegistryCards,
    ModelVersionCardsLoading,
    ModelVersionError,
    ModelVersionHeader,
    ModelVersionPagination,
    ModelVersionTable,
    ModelVersionTableLoading,
} from './components';

export const ModelVersion = () => {
    const navigate = useNavigate();
    const { modelId } = useParams();

    const { data, loading, error } = useListModelVersions(modelId || '');

    if (error) {
        return <ModelVersionError />;
    }

    const Models = () => {
        if (loading || (data && data.listMLModelVersions)) {
            return (
                <TabPanels>
                    <TabPanel>
                        {loading ? (
                            <ModelVersionCardsLoading />
                        ) : (
                            data && (
                                <ModelRegistryCards
                                    mlModelVersionList={data}
                                    navigateFn={navigate}
                                />
                            )
                        )}
                    </TabPanel>
                    <TabPanel>
                        {loading ? (
                            <ModelVersionTableLoading />
                        ) : (
                            data && (
                                <ModelVersionTable
                                    mlModelVersionList={data}
                                    navigateFn={navigate}
                                />
                            )
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
                    <ModelVersionHeader navigateFn={navigate} modelId={modelId || ''} />
                    <Divider className='my-4' />
                    <Models />
                </TabGroup>
                <div className='mt-4'>
                    <Divider />
                    {data && (
                        <ModelVersionPagination
                            continuationToken={data.listMLModelVersions.pageInfo.continuationToken}
                        />
                    )}
                </div>
            </Card>
        </div>
    );
};
