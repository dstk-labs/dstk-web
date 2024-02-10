import { gql, useMutation, type TypedDocumentNode } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { CreateAccount } from '@/types/User';

const CREATE_ACCOUNT: TypedDocumentNode<CreateAccount> = gql`
    mutation CreateAccount($data: AccountInput!) {
        createAccount(data: $data) {
            userId
        }
    }
`;

export const useCreateAccount = () => {
    const navigate = useNavigate();

    return useMutation(CREATE_ACCOUNT, {
        onCompleted: () => {
            navigate('/login');
            toast.success('Thanks for joining! Check your email for verification steps.');
        },
    });
};
