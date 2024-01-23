import { DocumentIcon, FolderIcon } from '@heroicons/react/24/outline';

import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@/components/ui';
import type { StorageProviderObjectList } from '@/types/StorageProvider';
import { createDirectory } from '../lib';

type FileExplorerProps = {
    objects: StorageProviderObjectList;
};

export const FileExplorer = ({ objects }: FileExplorerProps) => {
    const files = createDirectory(objects);

    return (
        <Card>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Size (kb)</TableHeaderCell>
                        <TableHeaderCell>Last Modified</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <>
                        {files.directories.map((directory) => (
                            <TableRow key={directory.name}>
                                <TableCell>
                                    <FolderIcon className='w-5 h-5' />
                                </TableCell>
                                <TableCell>{directory.name.split('/')[0]}</TableCell>
                                <TableCell>{directory.size}</TableCell>
                                <TableCell>{directory.lastModified}</TableCell>
                            </TableRow>
                        ))}
                        {files.files.map((file) => (
                            <TableRow key={file.name}>
                                <TableCell>
                                    <DocumentIcon className='w-5 h-5' />
                                </TableCell>
                                <TableCell>{file.name}</TableCell>
                                <TableCell>{file.size}</TableCell>
                                <TableCell>{file.lastModified}</TableCell>
                            </TableRow>
                        ))}
                    </>
                </TableBody>
            </Table>
        </Card>
    );
};
