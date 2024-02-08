import { Card, List, ListItem, Text } from '@tremor/react';
import { RiGitPrDraftLine } from '@remixicon/react';
import { type NavigateFunction } from 'react-router-dom';

import { NoModelVersionsFound } from './NoModelVersionsFound';
import { MLModelVersionList } from '@/types/MLModelVersion';
import { ModelVersionCopyID } from './ModelVersionCopyID';

type ModelRegistryCardsProps = {
    mlModelVersionList: MLModelVersionList;
    modelId: string;
    navigateFn: NavigateFunction;
};

export const ModelRegistryCards = ({
    mlModelVersionList,
    modelId,
    navigateFn,
}: ModelRegistryCardsProps) => {
    return (
        <div className='mt-6'>
            {mlModelVersionList.listMLModelVersions.edges.length === 0 ? (
                // TODO: THIS IS JANK!
                <NoModelVersionsFound navigateFn={navigateFn} modelId={modelId} />
            ) : (
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {mlModelVersionList.listMLModelVersions.edges.map((edge) => (
                        <Card
                            className='relative overflow-hidden p-0 hover:cursor-pointer'
                            key={edge.node.modelVersionId}
                            onClick={() =>
                                navigateFn(
                                    `/dashboard/models/${edge.node.modelId.modelId}/${edge.node.modelVersionId}`,
                                )
                            }
                        >
                            <div className='border-b border-tremor-border bg-tremor-background-muted p-6 dark:border-dark-tremor-border dark:bg-dark-tremor-background'>
                                <div className='flex items-center space-x-3'>
                                    <span className='flex h-12 w-12 items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background dark:border-dark-tremor-border dark:bg-dark-tremor-background'>
                                        <RiGitPrDraftLine
                                            aria-hidden={true}
                                            className='h-5 w-5 text-tremor-content dark:text-dark-tremor-content'
                                        />
                                    </span>
                                    <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                        Version {edge.node.numericVersion}
                                    </Text>
                                </div>
                            </div>
                            <div className='px-6 py-4'>
                                <List>
                                    <ListItem className='py-2.5'>
                                        <Text>ID</Text>
                                        <Text className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                            {edge.node.modelVersionId.substring(0, 8)}...
                                        </Text>
                                    </ListItem>
                                    <ListItem className='py-2.5'>
                                        <Text>Created By</Text>
                                        <Text className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                            {edge.node.createdBy.userName}
                                        </Text>
                                    </ListItem>
                                    <ListItem className='py-2.5'>
                                        <Text>Date Created</Text>
                                        <Text className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                            {new Date(
                                                parseInt(edge.node.dateCreated),
                                            ).toLocaleDateString()}
                                        </Text>
                                    </ListItem>
                                </List>
                            </div>
                            <div className='border-t border-tremor-border px-6 py-2 dark:border-dark-tremor-border'>
                                <ModelVersionCopyID modelVersionID={edge.node.modelVersionId} />
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
