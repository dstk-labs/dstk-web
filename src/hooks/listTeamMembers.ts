import { gql, useQuery, type TypedDocumentNode } from '@apollo/client';

import type { ListTeamMembers } from '@/types/User';

const LIST_TEAM_MEMBERS: TypedDocumentNode<ListTeamMembers> = gql`
    query ListTeamMembers($teamId: String!) {
        listTeamMembers(teamId: $teamId) {
            isAdmin
            primaryEmail
            realName
            userName
            userId
        }
    }
`;

export const useListTeamMembers = (teamId: string) => {
    return useQuery(LIST_TEAM_MEMBERS, {
        variables: {
            teamId: teamId,
        },
    });
};
