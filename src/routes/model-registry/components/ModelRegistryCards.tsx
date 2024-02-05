import { Card, List, ListItem, Text } from '@tremor/react';
import { RiStackLine } from '@remixicon/react';
import { type NavigateFunction } from 'react-router-dom';

import type { MLModelList } from '@/types/MLModel';

import { NoModelsFound } from './NoModelsFound';
import { ModelRegistryActions } from './ModelRegistryActions';

type ModelRegistryCardsProps = {
    mlModelList: MLModelList;
    navigateFn: NavigateFunction;
};

export const ModelRegistryCards = ({ mlModelList, navigateFn }: ModelRegistryCardsProps) => {
    return (
        <div className='mt-6'>
            {mlModelList.listMLModels.edges.length === 0 ? (
                <NoModelsFound />
            ) : (
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {mlModelList.listMLModels.edges.map((edge) => (
                        <Card
                            className='relative overflow-hidden p-0 hover:cursor-pointer'
                            key={edge.node.modelId}
                            onClick={() => navigateFn(`/dashboard/models/${edge.node.modelId}`)}
                        >
                            <div className='border-b border-tremor-border bg-tremor-background-muted p-6 dark:border-dark-tremor-border dark:bg-dark-tremor-background'>
                                <div className='flex items-center space-x-3'>
                                    <span className='flex h-12 w-12 items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background dark:border-dark-tremor-border dark:bg-dark-tremor-background'>
                                        <RiStackLine
                                            aria-hidden={true}
                                            className='h-5 w-5 text-tremor-content dark:text-dark-tremor-content'
                                        />
                                    </span>
                                    <Text className='text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                        {edge.node.modelName}
                                    </Text>
                                </div>
                            </div>
                            <div className='px-6 py-4'>
                                <List>
                                    <ListItem className='py-2.5'>
                                        <Text>Total Versions</Text>
                                        <Text className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                            {(edge.node.currentModelVersion &&
                                                edge.node.currentModelVersion.numericVersion) ||
                                                0}
                                        </Text>
                                    </ListItem>
                                    <ListItem className='py-2.5'>
                                        <Text>Created By</Text>
                                        <Text className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                            {edge.node.createdBy.userName}
                                        </Text>
                                    </ListItem>
                                    <ListItem className='py-2.5'>
                                        <Text>Last Modified</Text>
                                        <Text className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                            {new Date(
                                                parseInt(edge.node.dateModified),
                                            ).toLocaleDateString()}
                                        </Text>
                                    </ListItem>
                                    <ListItem className='py-2.5'>
                                        <Text>Status</Text>
                                        {/* TODO: This is their badge component w/ some additional styling */}
                                        <span className='inline-flex items-center gap-x-1.5 rounded-tremor-small bg-emerald-100 px-2 py-1 text-tremor-label font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-500 dark:ring-emerald-500/20'>
                                            <span
                                                className='h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500'
                                                aria-hidden={true}
                                            />
                                            Live
                                        </span>
                                    </ListItem>
                                </List>
                            </div>
                            <div className='border-t border-tremor-border px-6 py-2 dark:border-dark-tremor-border'>
                                <ModelRegistryActions
                                    modelId={edge.node.modelId}
                                    modelName={edge.node.modelName}
                                    navigateFn={navigateFn}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
