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
                            <TableCell>Hi</TableCell>
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
