import { Card, Divider, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { useParams, useRouteLoaderData } from 'react-router-dom';

import { useListProjects, useListTeamMembers } from '@/hooks';
import type { Team } from '@/types/Team';

import { useListUsers } from './api';
import { AddTeamMembers, Projects, TeamDetailsHeader, Users } from './components';

const ROLES = ['Owner', 'Member', 'Viewer'];

export const TeamDetails = () => {
    const { teamId } = useParams();
    const team = useRouteLoaderData('team-details') as Team;

    const {
        data: teamMembers,
        loading: teamMembersLoading,
        error: teamMembersError,
    } = useListTeamMembers(teamId || '');
    const { data: users, loading: usersLoading, error: usersError } = useListUsers();
    const {
        data: projects,
        loading: projectsLoading,
        error: projectsError,
    } = useListProjects(teamId || '');

    if (
        teamMembers &&
        teamMembers.listTeamMembers &&
        users &&
        users.listUsers &&
        projects &&
        projects.listProjects
    ) {
        return (
            <div className='px-4 sm:px-6 lg:px-8'>
                <Card>
                    <TeamDetailsHeader team={team} />
                    <div className='max-w-3xl'>
                        <AddTeamMembers
                            roles={ROLES}
                            teamId={teamId || ''}
                            users={users.listUsers.filter(
                                (user) =>
                                    !teamMembers.listTeamMembers
                                        .map((teamMember) => teamMember.userId)
                                        .includes(user.userId),
                            )}
                        />
                        <Divider className='my-10' />
                        <TabGroup className='mt-6'>
                            <TabList>
                                <Tab>Users</Tab>
                                <Tab>Projects</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Users
                                        roles={ROLES}
                                        teamMembers={teamMembers.listTeamMembers}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <Projects projects={projects.listProjects} />
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                </Card>
            </div>
        );
    }
};
