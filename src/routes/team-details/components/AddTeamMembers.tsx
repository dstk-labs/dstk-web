import { Button, Select, SelectItem } from '@tremor/react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { useZodForm } from '@/hooks';
import { FieldWrapper, Form } from '@/components/form';
import type { User } from '@/types/User';

import { useAddTeamMember } from '../api';

type AddTeamMembersProps = {
    roles: string[];
    teamId: string;
    users: User[];
};

const schema = z.object({
    role: z.union([z.literal('Owner'), z.literal('Member'), z.literal('Viewer')]),
    userId: z.string().startsWith('USR-', 'Please select a user.'),
});

export const AddTeamMembers = ({ roles, teamId, users }: AddTeamMembersProps) => {
    const [addTeamMember, { loading }] = useAddTeamMember();

    const form = useZodForm({ schema });

    console.log(form.getValues());

    const onSubmit = () => {
        const { role, userId } = form.getValues();

        addTeamMember({
            variables: {
                data: {
                    role: role.toLocaleLowerCase(),
                    teamId: teamId,
                    userId: userId,
                },
            },
        });

        form.reset();
    };

    return (
        <Form
            className='mt-6 flex flex-col gap-2 sm:flex-row sm:items-center'
            form={form}
            id='add-team-member'
            onSubmit={onSubmit}
        >
            <div className='w-full sm:w-fit'>
                <FieldWrapper>
                    <Controller
                        control={form.control}
                        name='role'
                        render={({ field: { onChange, value, ref } }) => (
                            <Select
                                defaultValue='Viewer'
                                disabled={users.length === 0}
                                enableClear={false}
                                onValueChange={onChange}
                                ref={ref}
                                value={value}
                            >
                                {roles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </FieldWrapper>
            </div>
            <div className='w-full'>
                <FieldWrapper>
                    <Controller
                        control={form.control}
                        name='userId'
                        render={({ field: { onChange, value, ref } }) => (
                            <Select
                                disabled={users.length === 0}
                                onValueChange={onChange}
                                placeholder={
                                    users.length === 0 ? 'No users available' : 'Select...'
                                }
                                ref={ref}
                                value={value}
                            >
                                {users.map((user) => (
                                    <SelectItem key={user.userId} value={user.userId}>
                                        {user.userName}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </FieldWrapper>
            </div>
            <Button
                disabled={users.length === 0}
                form='add-team-member'
                loading={loading}
                type='submit'
            >
                Add
            </Button>
        </Form>
    );
};
