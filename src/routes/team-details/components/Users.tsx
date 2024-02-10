import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { RiSearchLine } from '@remixicon/react';
import {
    Button,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    TextInput,
} from '@tremor/react';

import { Avatar } from '@/components/avatar';
import type { User } from '@/types/User';

const HEADERS = ['Member', 'Role'];

type UsersProps = {
    roles: string[];
    teamMembers: User[];
};

export const Users = ({ roles, teamMembers }: UsersProps) => {
    return (
        <div className='mt-4 flex flex-col gap-3'>
            <div className='sm:flex sm:items-center sm:space-x-2'>
                <TextInput
                    placeholder='Search users...'
                    type='text'
                    icon={RiSearchLine}
                    className='rounded-tremor-small'
                />
                <div className='mt-2 sm:mt-0 sm:w-fit'>
                    <Select
                        className='[&>button]:rounded-tremor-small'
                        enableClear={true}
                        placeholder='Role'
                    >
                        {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                                {role}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow className='border-b border-tremor-border dark:border-dark-tremor-border'>
                        {HEADERS.map((header) => (
                            <TableHeaderCell
                                className='text-xs uppercase text-tremor-content dark:text-dark-tremor-content'
                                key={header}
                            >
                                {header}
                            </TableHeaderCell>
                        ))}
                        <TableHeaderCell>
                            <span className='sr-only'>Edit member</span>
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teamMembers.map((teamMember) => (
                        <TableRow
                            key={teamMember.userId}
                            className='hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
                        >
                            <TableCell>
                                <div className='flex items-center space-x-4 truncate'>
                                    <Avatar className='h-10 w-10'>
                                        {teamMember.realName
                                            .split(' ')
                                            .map(([char]) => char.toUpperCase())
                                            .join('')}
                                    </Avatar>
                                    <div>
                                        <p className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                            {teamMember.userName}
                                        </p>
                                        <p className='text-tremor-label text-tremor-content dark:text-dark-tremor-content'>
                                            {teamMember.primaryEmail}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>Role Here!</TableCell>
                            <TableCell>
                                <div className='flex items-center justify-end gap-2'>
                                    <Button
                                        className='bg-tremor-background border border-tremor-border text-tremor-content hover:text-tremor-brand hover:bg-tremor-background-subtle dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:text-dark-tremor-content dark:hover:text-dark-tremor-brand dark:hover:bg-dark-tremor-background-subtle'
                                        icon={PencilSquareIcon}
                                        // onClick={(e) => handleArchive(e)}
                                        size='xs'
                                        tooltip='Edit role'
                                        variant='secondary'
                                    />
                                    <Button
                                        className='bg-tremor-background border border-tremor-border text-tremor-content hover:text-tremor-brand hover:bg-tremor-background-subtle dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:text-dark-tremor-content dark:hover:text-dark-tremor-brand dark:hover:bg-dark-tremor-background-subtle'
                                        icon={TrashIcon}
                                        // onClick={(e) => handleArchive(e)}
                                        size='xs'
                                        tooltip='Remove from team'
                                        variant='secondary'
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
