import { useEffect } from 'react';
import { Button, Select, SelectItem, TextInput, Textarea } from '@tremor/react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useLazyListProjects, useZodForm } from '@/hooks';
import { FieldWrapper, Form } from '@/components/form';
import { Skeleton } from '@/components/skeleton';
import type { StorageProvider } from '@/types/StorageProvider';
import { Team } from '@/types/Team';

import { useCreateModel } from '../api';
import { Controller } from 'react-hook-form';

type EditModelFormProps = {
    storageProviders: StorageProvider[];
    teams: Team[];
};

const schema = z.object({
    description: z.string().optional(),
    modelName: z.string().min(1, 'Model Name is required.'),
    projectId: z.string().uuid(),
    storageProviderId: z.string().uuid(),
    teamId: z.string().uuid(),
});

// TODO: No ability to actually change team, I just have this in here for now to grab the projects
export const CreateModelForm = ({ storageProviders, teams }: EditModelFormProps) => {
    const navigate = useNavigate();

    const [editModel, { loading: createModelLoading }] = useCreateModel();
    const [listProjects, { called, data: projects, loading: projectsLoading }] =
        useLazyListProjects();

    const form = useZodForm({
        schema,
    });

    const onSubmit = () => {
        const { description, modelName, projectId, storageProviderId } = form.getValues();

        editModel({
            variables: {
                data: {
                    description: description,
                    modelName: modelName,
                    projectId: projectId,
                    storageProviderId: storageProviderId,
                },
            },
        });
    };

    useEffect(() => {
        const teamId = form.getValues('teamId');

        if (teamId && teamId.length > 0) {
            listProjects({
                variables: {
                    teamId: teamId,
                },
            });
        }
    }, [form.watch('teamId')]);

    return (
        <>
            <Form form={form} id='edit-model' onSubmit={onSubmit}>
                <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6'>
                    <div className='col-span-full sm:col-span-3'>
                        <FieldWrapper label='Team'>
                            <Controller
                                control={form.control}
                                name='teamId'
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        onValueChange={onChange}
                                        placeholder='Select a team'
                                        ref={ref}
                                        value={value}
                                    >
                                        {teams.map((team) => (
                                            <SelectItem key={team.teamId} value={team.teamId}>
                                                {team.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FieldWrapper>
                    </div>
                    <div className='col-span-full sm:col-span-3'>
                        <FieldWrapper label='Project'>
                            {called && projectsLoading ? (
                                <Skeleton className='w-full h-8' />
                            ) : (
                                <Controller
                                    control={form.control}
                                    name='projectId'
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Select
                                            disabled={!called}
                                            onValueChange={onChange}
                                            placeholder={
                                                !called
                                                    ? 'Please select a team to view available projects'
                                                    : 'Select a project'
                                            }
                                            ref={ref}
                                            value={value}
                                        >
                                            {projects?.listProjects.map((project) => (
                                                <SelectItem
                                                    key={project.projectId}
                                                    value={project.projectId}
                                                >
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            )}
                        </FieldWrapper>
                    </div>
                    <div className='col-span-full sm:col-span-3'>
                        <FieldWrapper label='Model Name'>
                            <TextInput
                                error={Boolean(form.formState.errors.modelName)}
                                errorMessage={form.formState.errors.modelName?.message}
                                {...form.register('modelName')}
                            />
                        </FieldWrapper>
                    </div>
                    <div className='col-span-full sm:col-span-3'>
                        <FieldWrapper label='Storage Provider'>
                            <Controller
                                control={form.control}
                                name='storageProviderId'
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select onValueChange={onChange} ref={ref} value={value}>
                                        {storageProviders.map((storageProvider) => (
                                            <SelectItem
                                                key={storageProvider.providerId}
                                                value={storageProvider.providerId}
                                            >
                                                {storageProvider.bucket}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FieldWrapper>
                    </div>
                    <div className='col-span-full'>
                        <FieldWrapper label='Description'>
                            <Textarea
                                error={Boolean(form.formState.errors.description)}
                                errorMessage={form.formState.errors.description?.message}
                                placeholder=''
                                rows={4}
                                {...form.register('description')}
                            />
                        </FieldWrapper>
                    </div>
                </div>
            </Form>
            <div className='w-full flex items-center justify-end gap-4 mt-4'>
                <Button
                    className='whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong hover:text-text-tremor-default hover:dark:text-dark-tremor-content-strong'
                    onClick={() => navigate(`/dashboard/models/`)}
                    variant='light'
                >
                    Cancel
                </Button>
                <Button form='edit-model' loading={createModelLoading} type='submit'>
                    Submit
                </Button>
            </div>
        </>
    );
};
