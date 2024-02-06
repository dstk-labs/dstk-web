import { gql, useLazyQuery, type TypedDocumentNode } from '@apollo/client';

import { type ListProjects } from '@/types/Project';

const LIST_PROJECTS: TypedDocumentNode<ListProjects> = gql`
    query ListProjects($teamId: String!) {
        listProjects(teamId: $teamId) {
            name
            projectId
        }
    }
`;

export const useListProjects = () => useLazyQuery(LIST_PROJECTS);
