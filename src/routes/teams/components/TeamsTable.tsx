import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import type { NavigateFunction } from 'react-router-dom';

import type { Team } from '@/types/Team';

const HEADERS = ['Name', 'Date Created', 'Last Updated'];

type TeamsTableProps = {
    navigateFn: NavigateFunction;
    teams: Team[];
};

export const TeamsTable = ({ navigateFn, teams }: TeamsTableProps) => {
    return (
        <Table>
            <TableHead>
                <TableRow className='border-b border-tremor-border dark:border-dark-tremor-border'>
                    {HEADERS.map((header) => (
                        <TableHeaderCell
                            className='text-tremor-content-strong dark:text-dark-tremor-content-strong'
                            key={header}
                        >
                            {header}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {teams.map((team) => (
                    <TableRow
                        className='hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted hover:cursor-pointer'
                        key={team.teamId}
                        onClick={() => navigateFn(`/dashboard/teams/${team.teamId}`)}
                    >
                        <TableCell className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                            {team.name}
                        </TableCell>
                        <TableCell>
                            {new Date(parseInt(team.dateCreated)).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            {new Date(parseInt(team.dateModified)).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
