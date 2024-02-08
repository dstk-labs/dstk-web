import { Card } from '@tremor/react';
import { type NavigateFunction } from 'react-router-dom';

import { Team } from '@/types/Team';
import { RiArrowRightUpLine } from '@remixicon/react';

type TeamCardsProps = {
    navigateFn: NavigateFunction;
    teams: Team[];
};

export const TeamCards = ({ navigateFn, teams }: TeamCardsProps) => {
    return (
        <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {teams.map((team) => (
                <Card
                    className='group p-4 hover:cursor-pointer'
                    key={team.teamId}
                    onClick={() => navigateFn(`/dashboard/teams/${team.teamId}`)}
                >
                    <div className='flex items-center space-x-4'>
                        <div className='truncate'>
                            <p className='truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                {team.name}
                            </p>
                            <p className='truncate text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
                                {team.description}
                            </p>
                        </div>
                    </div>
                    <div className='mt-6 grid grid-cols-2 divide-x divide-tremor-border border-t border-tremor-border dark:divide-dark-tremor-border dark:border-dark-tremor-border'>
                        <div className='truncate px-3 py-2'>
                            <p className='truncate text-tremor-label text-tremor-content dark:text-dark-tremor-content'>
                                Owner
                            </p>
                            <p className='truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                {team.createdBy.userName}
                            </p>
                        </div>
                        <div className='truncate px-3 py-2'>
                            <p className='truncate text-tremor-label text-tremor-content dark:text-dark-tremor-content'>
                                Last Modified
                            </p>
                            <p className='truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                {new Date(parseInt(team.dateModified)).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <span
                        className='pointer-events-none absolute right-4 top-4 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content'
                        aria-hidden={true}
                    >
                        <RiArrowRightUpLine className='h-4 w-4' aria-hidden={true} />
                    </span>
                </Card>
            ))}
        </div>
    );
};
