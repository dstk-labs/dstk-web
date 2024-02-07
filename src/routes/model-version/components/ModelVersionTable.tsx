import type { NavigateFunction } from 'react-router-dom';

import type { MLModelVersionList } from '@/types/MLModelVersion';

import { NoModelVersionsFound } from './NoModelVersionsFound';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { ModelVersionCopyID } from './ModelVersionCopyID';

type ModelVersionTableProps = {
    mlModelVersionList: MLModelVersionList;
    navigateFn: NavigateFunction;
};

const HEADERS = ['Version ID', 'Version', 'Created By', 'Date Created', 'Actions'];

export const ModelVersionTable = ({ mlModelVersionList, navigateFn }: ModelVersionTableProps) => {
    return (
        <div className='mt-6'>
            {mlModelVersionList.listMLModelVersions.edges.length === 0 ? (
                <NoModelVersionsFound />
            ) : (
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
                        {mlModelVersionList.listMLModelVersions.edges.map((edge) => (
                            <TableRow
                                className='hover:cursor-pointer hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
                                key={edge.node.modelVersionId}
                                onClick={() =>
                                    navigateFn(
                                        `/dashboard/models/${edge.node.modelId.modelId}/${edge.node.modelVersionId}`,
                                    )
                                }
                            >
                                <TableCell className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                    {edge.node.modelVersionId.substring(0, 8)}...
                                </TableCell>
                                <TableCell>{edge.node.numericVersion}</TableCell>
                                <TableCell>{edge.node.createdBy.userName}</TableCell>
                                <TableCell>
                                    {new Date(parseInt(edge.node.dateCreated)).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <ModelVersionCopyID modelVersionID={edge.node.modelVersionId} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};
