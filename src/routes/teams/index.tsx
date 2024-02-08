import { Card, Divider, TabGroup, TabPanel, TabPanels } from '@tremor/react';
import { useNavigate } from 'react-router-dom';

import { useListTeams } from '@/hooks';

import {
    NoTeamsFound,
    TeamCards,
    TeamCardsLoading,
    TeamsError,
    TeamsHeader,
    TeamsTable,
} from './components';
import { TeamsTableLoading } from './components/TeamsTableLoading';

export const Teams = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useListTeams();

    if (error) {
        return <TeamsError />;
    }

    const Teams = () => {
        if (data || loading) {
            if (data && data.listTeams.length === 0) {
                return <NoTeamsFound />;
            } else {
                return (
                    <TabPanels>
                        <TabPanel>
                            {data ? (
                                <TeamCards navigateFn={navigate} teams={data.listTeams} />
                            ) : (
                                <TeamCardsLoading />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {data ? (
                                <TeamsTable navigateFn={navigate} teams={data.listTeams} />
                            ) : (
                                <TeamsTableLoading />
                            )}
                        </TabPanel>
                    </TabPanels>
                );
            }
        }
    };

    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <Card>
                <TabGroup className='text-right'>
                    <TeamsHeader />
                    <Divider className='my-4' />
                    <Teams />
                </TabGroup>
            </Card>
        </div>
    );
};
