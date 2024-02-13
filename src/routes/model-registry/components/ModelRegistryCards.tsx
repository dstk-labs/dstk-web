import { useReadQuery, type QueryReference } from '@apollo/client';
import { RiStackLine } from '@remixicon/react';
import { Card, List, ListItem, Text } from '@tremor/react';
import { Link, useNavigate } from 'react-router-dom';

import { cn } from '@/lib';
import type { MLModelList } from '@/types/MLModel';

import { NoModelsFound } from './NoModelsFound';
import { ModelRegistryActions } from './ModelRegistryActions';
import { ModelStatusIndicator } from './ModelStatusIndicator';

type ModelRegistryCardsProps = {
    isPending: boolean;
    queryRef: QueryReference<MLModelList>;
};

export const ModelRegistryCards = ({ isPending, queryRef }: ModelRegistryCardsProps) => {
    const navigate = useNavigate();
    const { data } = useReadQuery(queryRef);

    return (
        <div className={cn(isPending && 'opacity-50')}>
            {data.listMLModels.edges.length === 0 ? (
                <NoModelsFound />
            ) : (
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {data.listMLModels.edges.map((edge) => (
                        <Link key={edge.node.modelId} to={`/dashboard/models/${edge.node.modelId}`}>
                            <Card className='p-0'>
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
                                        <ListItem>
                                            <Text>Status</Text>
                                            <ModelStatusIndicator
                                                isArchived={edge.node.isArchived}
                                            />
                                        </ListItem>
                                    </List>
                                </div>
                                <div className='border-t px-6 py-2'>
                                    <ModelRegistryActions
                                        modelId={edge.node.modelId}
                                        modelName={edge.node.modelName}
                                        navigateFn={navigate}
                                    />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
