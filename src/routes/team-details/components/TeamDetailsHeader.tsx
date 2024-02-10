import type { Team } from '@/types/Team';

type TeamDetailHeaderProps = {
    team: Team;
};

export const TeamDetailsHeader = ({ team }: TeamDetailHeaderProps) => {
    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                    {team.name}
                </h3>
                <p className='text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content'>
                    {team.description}
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                    Add new team members
                </h4>
                <p className='text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content'>
                    Team owners can add, manage, and remove members.
                </p>
            </div>
        </div>
    );
};
