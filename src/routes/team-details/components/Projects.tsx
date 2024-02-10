import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { RiSearchLine } from '@remixicon/react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    TextInput,
} from '@tremor/react';

import type { Project } from '@/types/Project';

const HEADERS = ['Project', 'Last Modified'];

type ProjectsProps = {
    projects: Project[];
};

export const Projects = ({ projects }: ProjectsProps) => {
    return (
        <div className='mt-4 flex flex-col gap-3'>
            <TextInput
                placeholder='Search projects...'
                type='text'
                icon={RiSearchLine}
                className='rounded-tremor-small'
            />
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
                    {projects.map((project) => (
                        <TableRow
                            key={project.projectId}
                            className='hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
                        >
                            <TableCell>{project.name}</TableCell>
                            <TableCell>
                                {new Date(parseInt(project.dateModified)).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Button
                                    className='bg-tremor-background border border-tremor-border text-tremor-content hover:text-tremor-brand hover:bg-tremor-background-subtle dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:text-dark-tremor-content dark:hover:text-dark-tremor-brand dark:hover:bg-dark-tremor-background-subtle'
                                    icon={PencilSquareIcon}
                                    // onClick={(e) => handleArchive(e)}
                                    size='xs'
                                    tooltip='Edit'
                                    variant='secondary'
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
