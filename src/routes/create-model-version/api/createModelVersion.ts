import { gql, useMutation, type TypedDocumentNode } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { CreateMLModelVersion } from '@/types/MLModelVersion';

const CREATE_MODEL_VERSION: TypedDocumentNode<CreateMLModelVersion> = gql`
    mutation CreateModelVersion($data: ModelVersionInput!) {
        createModelVersion(data: $data) {
            modelVersionId
            modelId {
                modelId
            }
            numericVersion
        }
    }
`;

export const useCreateModelVersion = () => {
    const navigate = useNavigate();

    return useMutation(CREATE_MODEL_VERSION, {
        refetchQueries: ['ListMLModelVersions'],
        onCompleted: (data) => {
            const { modelId, modelVersionId, numericVersion } = data.createModelVersion;

            navigate(`/dashboard/models/${modelId.modelId}/${modelVersionId}`);
            toast.success(`Successfully registered version ${numericVersion}`);
        },
    });
};
