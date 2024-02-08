import { DocumentIcon, FolderIcon } from '@heroicons/react/24/outline';
import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';
import { useAtom } from 'jotai';

import type { StorageProviderObjectList } from '@/types/StorageProvider';

import { listObjectsPaginationAtom } from '../atoms';
import { createDirectory } from '../lib';

const HEADERS = ['Type', 'Name', 'Size (kb)', 'Last Modified'];

type FileExplorerProps = {
    objects: StorageProviderObjectList;
};

export const FileExplorer = ({ objects }: FileExplorerProps) => {
    const [inputs, setInputs] = useAtom(listObjectsPaginationAtom);
    const files = createDirectory(objects);

    return (
        <Card>
            <Table>
                <TableHead>
                    <TableRow className='border-b border-tremor-border dark:border-dark-tremor-border'>
                        {HEADERS.map((header) => (
                            <TableHeaderCell
                                className='text-tremor-content-strong dark:text-dark-tremor-content-strong'
                                key={header}
                            >
                                {header}
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <>
                        {inputs.prefixes.length > 1 ? (
                            <TableRow
                                className='hover:bg-gray-100 hover:cursor-pointer'
                                onClick={() =>
                                    setInputs((values) => ({
                                        ...values,
                                        prefixes: values.prefixes.slice(0, -1),
                                    }))
                                }
                            >
                                <TableCell>
                                    <FolderIcon className='w-5 h-5' />
                                </TableCell>
                                <TableCell>..</TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        ) : null}
                        {files.directories.map((directory) => (
                            <TableRow
                                className='hover:bg-gray-100 hover:cursor-pointer'
                                onClick={() =>
                                    setInputs((values) => ({
                                        ...values,
                                        prefixes: [
                                            ...values.prefixes,
                                            directory.name.split('/')[0],
                                        ],
                                    }))
                                }
                                key={directory.name}
                            >
                                <TableCell>
                                    <FolderIcon className='w-5 h-5' />
                                </TableCell>
                                <TableCell>{directory.name.split('/')[0]}</TableCell>
                                <TableCell>{directory.size}</TableCell>
                                <TableCell>
                                    {new Date(directory.lastModified).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                        {files.files.map((file) => (
                            <TableRow className='hover:bg-gray-100' key={file.name}>
                                <TableCell>
                                    <DocumentIcon className='w-5 h-5' />
                                </TableCell>
                                <TableCell>{file.name}</TableCell>
                                <TableCell>{file.size}</TableCell>
                                <TableCell>
                                    {new Date(file.lastModified).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                </TableBody>
            </Table>
        </Card>
    );
};
