import { type QueryReference, useReadQuery } from '@apollo/client';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib';
import type { MLModelList } from '@/types/MLModel';

import { NoModelsFound } from './NoModelsFound';
import { ModelRegistryActions } from './ModelRegistryActions';
import { ModelStatusIndicator } from './ModelStatusIndicator';

const HEADERS = ['Name', 'Total Versions', 'Status', 'Created By', 'Last Modified', 'Actions'];

type ModelRegistryTableProps = {
    isPending: boolean;
    queryRef: QueryReference<MLModelList>;
};

export const ModelRegistryTable = ({ isPending, queryRef }: ModelRegistryTableProps) => {
    const navigate = useNavigate();

    const { data } = useReadQuery(queryRef);

    return (
        <div className={cn(isPending && 'opacity-50')}>
            {data.listMLModels.edges.length === 0 ? (
                <NoModelsFound />
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
                        {data.listMLModels.edges.map((edge) => (
                            <TableRow
                                className='hover:cursor-pointer hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
                                key={edge.node.modelId}
                                onClick={() => navigate(`/dashboard/models/${edge.node.modelId}`)}
                            >
                                <TableCell className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                                    {edge.node.modelName}
                                </TableCell>
                                <TableCell>
                                    {(edge.node.currentModelVersion &&
                                        edge.node.currentModelVersion.numericVersion) ||
                                        0}
                                </TableCell>
                                <TableCell>
                                    <ModelStatusIndicator isArchived={edge.node.isArchived} />
                                </TableCell>
                                <TableCell>{edge.node.createdBy.userName}</TableCell>
                                <TableCell>
                                    {new Date(
                                        parseInt(edge.node.dateModified),
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <ModelRegistryActions
                                        modelId={edge.node.modelId}
                                        modelName={edge.node.modelName}
                                        navigateFn={navigate}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};
