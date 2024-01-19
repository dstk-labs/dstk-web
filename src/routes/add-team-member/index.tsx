import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import { useListTeams } from '@/hooks';

import { AddTeamMemberHeader } from './components';

export const AddTeamMember = () => {
    const { teamId } = useParams();

    const { data, loading, error } = useListTeams(teamId);

    if (error) {
        return <p>Error loading team information.</p>;
    }

    if (loading) {
        return <BarLoader color='#2563eb' width='250px' />;
    }

    if (data && data.listTeams) {
        return (
            <div className='w-full flex flex-col gap-8'>
                <AddTeamMemberHeader team={data.listTeams[0]} />
            </div>
        );
    } else {
        return null;
    }
};
