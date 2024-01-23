import { gql, useQuery, type TypedDocumentNode } from '@apollo/client';
import { useAtomValue } from 'jotai';

import type { StorageProviderObjectList } from '@/types/StorageProvider';
import { useNotificationStore } from '@/stores';

import { listObjectsPaginationAtom } from '../atoms';

const LIST_OBJECTS_FOR_MODEL_VERSION: TypedDocumentNode<StorageProviderObjectList> = gql`
    query ListObjectsForModelVersion(
        $modelVersionId: String!
        $after: String
        $first: Limit!
        $prefix: String
    ) {
        listObjectsForModelVersion(
            modelVersionId: $modelVersionId
            after: $after
            first: $first
            prefix: $prefix
        ) {
            edges {
                cursor
                node {
                    lastModified
                    name
                    size
                }
            }
            pageInfo {
                continuationToken
                hasNextPage
                hasPreviousPage
            }
        }
    }
`;

export const useListStorageProviderObjects = (modelVersionId: string) => {
    const { addNotification } = useNotificationStore();
    const inputs = useAtomValue(listObjectsPaginationAtom);

    return useQuery(LIST_OBJECTS_FOR_MODEL_VERSION, {
        variables: {
            after: inputs.continuationTokens.at(-1),
            first: inputs.first,
            modelVersionId: modelVersionId,
            prefix: inputs.prefix,
        },
        onError: (error) =>
            addNotification({
                type: 'error',
                title: 'Error',
                children: error.message,
            }),
    });
};
