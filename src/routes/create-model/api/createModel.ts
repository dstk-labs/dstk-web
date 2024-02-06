import { useMutation, type TypedDocumentNode, gql } from '@apollo/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import type { CreateMLModel } from '@/types/MLModel';

const CREATE_MODEL: TypedDocumentNode<CreateMLModel> = gql`
    mutation CreateModel($data: ModelInput!) {
        createModel(data: $data) {
            modelId
            modelName
        }
    }
`;

export const useCreateModel = () => {
    const navigate = useNavigate();

    return useMutation(CREATE_MODEL, {
        onCompleted: (data) => {
            navigate(`/dashboard/models/${data.createModel.modelId}`);
            toast.success(`Successfully registered ${data.createModel.modelName}`);
        },
        refetchQueries: ['ListMLModels'],
    });
};
