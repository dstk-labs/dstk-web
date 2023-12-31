import { gql, useQuery, type TypedDocumentNode } from '@apollo/client';

import type { StorageProviderList } from '@/types/StorageProvider';

const LIST_STORAGE_PROVIDERS: TypedDocumentNode<StorageProviderList> = gql`
    query ListStorageProviders {
        listStorageProviders {
            providerId
            bucket
        }
    }
`;

export const useListStorageProviders = () => useQuery(LIST_STORAGE_PROVIDERS);
