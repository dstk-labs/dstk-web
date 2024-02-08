import { useParams } from 'react-router-dom';

import { useGetMLModelVersion, useListStorageProviderObjects } from './api';
import {
    FileExplorer,
    FileExplorerLoading,
    FileExplorerPagination,
    MLVersionDetailsError,
    MLVersionMetadata,
    MetadataLoading,
    ModelVersionDetailsHeader,
    NoObjects,
} from './components';
import { Card, Divider, Text } from '@tremor/react';

export const ModelVersionDetails = () => {
    const { versionId } = useParams();

    const {
        data: model,
        loading: modelLoading,
        error: modelError,
    } = useGetMLModelVersion(versionId || '');
    const {
        data: objects,
        loading: objectsLoading,
        error: objectsError,
    } = useListStorageProviderObjects(versionId || '');

    if (modelError || objectsError) {
        return <MLVersionDetailsError />;
    }

    const Metadata = () => {
        if (modelLoading) {
            return <MetadataLoading />;
        }

        if (model && model.getMLModelVersion) {
            return (
                <Card>
                    <ModelVersionDetailsHeader mlModelVersion={model.getMLModelVersion} />
                    <Divider className='my-4' />
                    <MLVersionMetadata mlModelVersion={model.getMLModelVersion} />
                </Card>
            );
        }
    };

    const Objects = () => {
        if (objectsLoading) {
            return <FileExplorerLoading />;
        }

        if (objects && objects.listObjectsForModelVersion) {
            if (objects.listObjectsForModelVersion.edges.length === 0) {
                return <NoObjects />;
            } else {
                return <FileExplorer objects={objects} />;
            }
        }
    };

    return (
        <div className='flex flex-col gap-8 px-4 sm:px-6 lg:px-8'>
            <Metadata />
            {/* Add case where there is no objects yet */}
            <Card>
                <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                    Files
                </Text>
                <Divider className='my-4' />
                <Objects />
                <Divider className='my-4' />
                {objects && objects.listObjectsForModelVersion.edges.length > 0 && (
                    <FileExplorerPagination
                        continuationToken={
                            objects.listObjectsForModelVersion.pageInfo.continuationToken
                        }
                    />
                )}
            </Card>
        </div>
    );
};
