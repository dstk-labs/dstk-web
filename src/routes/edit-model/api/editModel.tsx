import { gql, useMutation, type TypedDocumentNode } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { EditMLModel } from '@/types/MLModel';

const EDIT_MODEL: TypedDocumentNode<EditMLModel> = gql`
    mutation EditModel($data: ModelInput!, $modelId: String!) {
        editModel(data: $data, modelId: $modelId) {
            modelId
        }
    }
`;

export const useEditModel = () => {
    const navigate = useNavigate();

    return useMutation(EDIT_MODEL, {
        onCompleted: (data) => {
            navigate(`/dashboard/models/${data.editModel.modelId}`);
            toast.success(`Successfully updated ${data.editModel.modelName}`);
        },
        refetchQueries: ['ListMLModels', 'GetMLModel'],
    });
};
