import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import { useGetMLModelVersion, useListStorageProviderObjects } from './api';
import {
    FileExplorer,
    FileExplorerPagination,
    MLVersionMetadata,
    ModelVersionDetailsHeader,
} from './components';

export const ModelVersionDetails = () => {
    const { versionId } = useParams();

    const { data: model, loading: modelLoading } = useGetMLModelVersion(versionId || '');
    const { data: objects, loading: objectsLoading } = useListStorageProviderObjects(
        versionId || '',
    );

    if (modelLoading || objectsLoading) {
        return <BarLoader color='#2563eb' width='250px' />;
    }

    if (model && model.getMLModelVersion && objects && objects.listObjectsForModelVersion) {
        return (
            <div className='w-full flex flex-col gap-12'>
                <ModelVersionDetailsHeader mlModelVersion={model.getMLModelVersion} />
                <MLVersionMetadata mlModelVersion={model.getMLModelVersion} />
                <FileExplorer objects={objects} />
                <FileExplorerPagination
                    continuationToken={
                        objects.listObjectsForModelVersion.pageInfo.continuationToken
                    }
                />
            </div>
        );
    } else {
        return null;
    }
};
