import { useNavigate } from 'react-router-dom';

import { TeamsHeader } from './components';

export const Teams = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full flex flex-col gap-12'>
            <TeamsHeader navigateFn={navigate} />
        </div>
    );
};
