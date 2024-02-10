import { createBrowserRouter, RouterProvider as Router } from 'react-router-dom';

import {
    AddTeamMember,
    APIKeys,
    CreateModel,
    CreateModelVersion,
    CreateTeam,
    EditModel,
    Home,
    Login,
    ModelRegistry,
    ModelVersion,
    ModelVersionDetails,
    Register,
    TeamDetails,
    Teams,
    UploadFiles,
    UserSettings,
} from '@/routes';
import { GET_MODEL, LIST_TEAMS } from '@/hooks';
import { apolloClient } from '@/lib';
import { PrivateRoute, PublicRoute } from '@/components/auth';
import { DashboardLayout } from '@/components/layout';
import { MLModel } from '@/types/MLModel';
import type { MLModelVersion } from '@/types/MLModelVersion';
import type { Team } from '@/types/Team';
import { GET_MODEL_VERSION } from '@/routes/model-version-details/api';

export const RouterProvider = () => {
    const router = createBrowserRouter([
        {
            element: <PublicRoute />,
            children: [
                {
                    path: '/',
                    element: <div>Welcome to dstk!</div>,
                },
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/register',
                    element: <Register />,
                },
            ],
        },
        {
            element: <PrivateRoute />,
            children: [
                {
                    element: <DashboardLayout />,
                    handle: {
                        crumb: () => 'Home',
                    },
                    children: [
                        {
                            path: '/dashboard/home',
                            element: <Home />,
                        },
                        {
                            path: '/dashboard/models',
                            handle: {
                                crumb: () => 'Models',
                            },
                            children: [
                                {
                                    element: <ModelRegistry />,
                                    index: true,
                                },
                                {
                                    path: '/dashboard/models/create',
                                    element: <CreateModel />,
                                    handle: {
                                        crumb: () => 'Create',
                                    },
                                },
                                {
                                    path: '/dashboard/models/:modelId',
                                    loader: async ({ params }) => {
                                        const { data } = await apolloClient.query({
                                            query: GET_MODEL,
                                            variables: {
                                                modelId: params.modelId,
                                            },
                                        });

                                        return (data && data.getMLModel) || [];
                                    },
                                    handle: {
                                        crumb: (data: MLModel) => data.modelName,
                                    },
                                    children: [
                                        {
                                            element: <ModelVersion />,
                                            index: true,
                                        },
                                        {
                                            path: '/dashboard/models/:modelId/edit',
                                            element: <EditModel />,
                                            handle: {
                                                crumb: () => 'Edit',
                                            },
                                        },
                                        {
                                            path: '/dashboard/models/:modelId/create',
                                            element: <CreateModelVersion />,
                                            handle: {
                                                crumb: () => 'Create',
                                            },
                                        },
                                        {
                                            path: '/dashboard/models/:modelId/:versionId',
                                            loader: async ({ params }) => {
                                                const { data } = await apolloClient.query({
                                                    query: GET_MODEL_VERSION,
                                                    variables: {
                                                        modelVersionId: params.versionId,
                                                    },
                                                });

                                                return (data && data.getMLModelVersion) || [];
                                            },
                                            handle: {
                                                crumb: (data: MLModelVersion) =>
                                                    `v${data.numericVersion}`,
                                            },
                                            children: [
                                                {
                                                    element: <ModelVersionDetails />,
                                                    index: true,
                                                },
                                                {
                                                    path: '/dashboard/models/:modelId/:versionId/upload',
                                                    element: <UploadFiles />,
                                                    handle: {
                                                        crumb: () => 'Upload Files',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            path: '/dashboard/teams',
                            handle: {
                                crumb: () => 'Teams',
                            },
                            children: [
                                {
                                    element: <Teams />,
                                    index: true,
                                },
                                {
                                    path: '/dashboard/teams/create',
                                    element: <CreateTeam />,
                                    handle: {
                                        crumb: () => 'Create',
                                    },
                                },
                                {
                                    path: '/dashboard/teams/:teamId',
                                    id: 'team-details',
                                    loader: async ({ params }) => {
                                        const { data } = await apolloClient.query({
                                            query: LIST_TEAMS,
                                            variables: {
                                                teamId: params.teamId,
                                            },
                                        });

                                        return (data && data.listTeams[0]) || [];
                                    },
                                    handle: {
                                        crumb: (data: Team) => data.name,
                                    },
                                    children: [
                                        {
                                            element: <TeamDetails />,
                                            index: true,
                                        },
                                        {
                                            path: '/dashboard/teams/:teamId/add-member',
                                            element: <AddTeamMember />,
                                            handle: {
                                                crumb: () => 'Add Team Member',
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            path: '/dashboard/settings',
                            handle: {
                                crumb: () => 'Settings',
                            },
                            children: [
                                {
                                    element: <UserSettings />,
                                    index: true,
                                },
                                {
                                    path: '/dashboard/settings/api-keys',
                                    element: <APIKeys />,
                                    handle: {
                                        crumb: () => 'API Keys',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);

    return <Router router={router} />;
};
