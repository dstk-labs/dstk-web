import { Suspense, useTransition } from 'react';
import {
    gql,
    useQueryRefHandlers,
    type OperationVariables,
    type QueryReference,
    type TypedDocumentNode,
} from '@apollo/client';
import { Button, Card, Divider, TabGroup, TabPanel, TabPanels, TextInput } from '@tremor/react';
import { Link, useLoaderData } from 'react-router-dom';

import { preloadQuery } from '@/lib';

import { DataView } from '@/components/data-view';
import { Fallback } from '@/components/fallback';
import { Header } from '@/components/typography';
import { VerticalDivider } from '@/components/vertical-divider';
import type { MLModelList } from '@/types/MLModel';

import {
    ArchiveModal,
    ModelRegistryCards,
    ModelRegistryPagination,
    ModelRegistryTable,
} from './components';

const LIST_MODELS: TypedDocumentNode<MLModelList> = gql`
    query ListMLModels($after: String, $first: Limit, $modelName: String) {
        listMLModels(after: $after, first: $first, modelName: $modelName) {
            edges {
                cursor
                node {
                    isArchived
                    modelId
                    modelName
                    currentModelVersion {
                        numericVersion
                    }
                    createdBy {
                        userName
                    }
                    dateModified
                }
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                continuationToken
            }
        }
    }
`;

const useModelRegistryLoader = () => preloadQuery(LIST_MODELS);

const ModelRegistry = () => {
    const [isPending, startTransition] = useTransition();

    const queryRef = useLoaderData() as QueryReference<MLModelList>;
    const { refetch } = useQueryRefHandlers(queryRef);

    const handleRefetch = (variables?: Partial<OperationVariables> | undefined) => {
        startTransition(() => {
            refetch(variables);
        });
    };

    return (
        <>
            <Card>
                <TabGroup>
                    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0'>
                        <Header>Model Registry</Header>
                        <div className='flex flex-col gap-4 md:flex-row md:items-center'>
                            <div className='flex items-center gap-4'>
                                <TextInput
                                    onChange={(e) => handleRefetch({ modelName: e.target.value })}
                                    placeholder='Search Models'
                                />
                                <VerticalDivider className='hidden md:block' />
                                <DataView className='-mr-3 w-[135px]' />
                            </div>
                            <VerticalDivider className='hidden md:block' />
                            <Link to='/dashboard/models/create'>
                                <Button disabled={isPending}>Add Model</Button>
                            </Link>
                        </div>
                    </div>
                    <Divider className='my-4' />
                    <TabPanels>
                        <TabPanel>
                            <TabPanel className='pt-6'>
                                <Suspense fallback={<Fallback />}>
                                    <ModelRegistryCards isPending={isPending} queryRef={queryRef} />
                                </Suspense>
                            </TabPanel>
                        </TabPanel>
                        <TabPanel className='pt-6'>
                            <Suspense fallback={<Fallback />}>
                                <ModelRegistryTable isPending={isPending} queryRef={queryRef} />
                            </Suspense>
                        </TabPanel>
                    </TabPanels>
                    <Divider className='my-4' />
                    <Suspense>
                        <ModelRegistryPagination
                            isPending={isPending}
                            onRefetch={handleRefetch}
                            queryRef={queryRef}
                        />
                    </Suspense>
                </TabGroup>
            </Card>
            <ArchiveModal />
        </>
    );
};

export const modelRegistryRoute = () => {
    return {
        index: true,
        element: <ModelRegistry />,
        loader: useModelRegistryLoader,
    };
};
