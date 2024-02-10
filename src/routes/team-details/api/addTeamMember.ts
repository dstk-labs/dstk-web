import { gql, useMutation, type TypedDocumentNode } from '@apollo/client';
import { toast } from 'sonner';

import type { AddToTeam } from '@/types/Team';

const ADD_TO_TEAM: TypedDocumentNode<AddToTeam> = gql`
    mutation AddToTeam($data: AddTeamMemberInput!) {
        addToTeam(data: $data)
    }
`;

export const useAddTeamMember = () => {
    return useMutation(ADD_TO_TEAM, {
        refetchQueries: ['ListTeamMembers'],
        onCompleted: () => toast.success(`Successfully added member to team`),
    });
};
