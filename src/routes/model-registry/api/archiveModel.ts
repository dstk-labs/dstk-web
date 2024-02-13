import { gql, useMutation, type TypedDocumentNode } from '@apollo/client';
import { toast } from 'sonner';

import type { ArchiveMLModel } from '@/types/MLModel';

const ARCHIVE_MODEL: TypedDocumentNode<ArchiveMLModel> = gql`
    mutation ArchiveModel($modelId: String!) {
        archiveModel(modelId: $modelId) {
            modelId
            modelName
        }
    }
`;

export const useArchiveModel = () =>
    useMutation(ARCHIVE_MODEL, {
        refetchQueries: ['ListMLModels'],
        onCompleted: (data) => {
            toast.warning(`${data.archiveModel.modelName} has been archived.`);
        },
    });
