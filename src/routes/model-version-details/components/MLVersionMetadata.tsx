import { List, ListItem } from '@tremor/react';

import type { MLModelVersion } from '@/types/MLModelVersion';

type MLVersionMetadataProps = {
    mlModelVersion: MLModelVersion;
};

export const MLVersionMetadata = ({ mlModelVersion }: MLVersionMetadataProps) => {
    const { modelId, numericVersion } = mlModelVersion;

    return (
        <div className='flex items-start gap-10'>
            <List>
                <ListItem className='py-4'>
                    <div className='w-full'>
                        <p className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                            Version Number
                        </p>
                        <div className='w-full md:w-4/12'>
                            <p className='text-tremor-label text-tremor-content dark:text-dark-tremor-content'>
                                Version {numericVersion}
                            </p>
                        </div>
                    </div>
                </ListItem>
                <ListItem className='py-4'>
                    <div className='w-full'>
                        <p className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                            Created By
                        </p>
                        <div className='w-full md:w-4/12'>
                            <p className='text-tremor-label text-tremor-content dark:text-dark-tremor-content'>
                                {mlModelVersion.createdBy.userName}
                            </p>
                        </div>
                    </div>
                </ListItem>
                <ListItem className='py-4'>
                    <div className='w-full'>
                        <p className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                            Last Updated
                        </p>
                        <div className='w-full md:w-4/12'>
                            <p className='text-tremor-label text-tremor-content dark:text-dark-tremor-content'>
                                {new Date(parseInt(modelId.dateModified)).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </ListItem>
            </List>
        </div>
    );
};
