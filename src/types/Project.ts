import type { User } from './User';

export type Project = {
    createdBy: User;
    dateCreated: string;
    dateModified: string;
    description: string;
    isArchived: boolean;
    modifiedBy: User;
    name: string;
    projectId: string;
};

export type ListProjects = {
    listProjects: Project[];
};
