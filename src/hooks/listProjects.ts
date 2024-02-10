import { gql, useLazyQuery, type TypedDocumentNode, useQuery } from '@apollo/client';

import { type ListProjects } from '@/types/Project';

const LIST_PROJECTS: TypedDocumentNode<ListProjects> = gql`
    query ListProjects($teamId: String!) {
        listProjects(teamId: $teamId) {
            dateModified
            name
            projectId
        }
    }
`;

export const useLazyListProjects = () => useLazyQuery(LIST_PROJECTS);

export const useListProjects = (teamId: string) =>
    useQuery(LIST_PROJECTS, {
        variables: {
            teamId: teamId,
        },
    });
