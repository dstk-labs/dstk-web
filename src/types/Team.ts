import type { User } from './User';

export type Team = {
    createdBy: User;
    dateCreated: string;
    dateModified: string;
    description: string;
    modifiedBy: User;
    name: string;
    teamId: string;
};

export type TeamList = {
    listTeams: Team[];
};

export type CreateTeam = {
    createTeam: Team;
};

export type AddToTeam = {
    addToTeam: boolean;
};
