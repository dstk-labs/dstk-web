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
import { isDirectory } from '../lib';

type FileExplorerProps = {
    objects: StorageProviderObjectList;
};

export const FileExplorer = ({ objects }: FileExplorerProps) => {
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
                    {objects.listObjectsForModelVersion.edges.map((edge) => (
                        <TableRow key={edge.node.name}>
                            <TableCell>
                                {isDirectory(edge.node.name) ? (
                                    <FolderIcon className='w-5 h-5' />
                                ) : (
                                    <DocumentIcon className='w-5 h-5' />
                                )}
                            </TableCell>
                            <TableCell>{edge.node.name}</TableCell>
                            <TableCell>{edge.node.size}</TableCell>
                            <TableCell>{edge.node.lastModified}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};
