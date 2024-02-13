import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import type { NavigateFunction } from 'react-router-dom';

import { CircleIcon } from '@/components/icons';
import type { MLModelList } from '@/types/MLModel';

import { ModelRegistryActions } from './ModelRegistryActions';
import { NoModelsFound } from './NoModelsFound';

const HEADERS = ['Name', 'Total Versions', 'Status', 'Created By', 'Last Modified', 'Actions'];

type ModelRegistryTableProps = {
    mlModelList: MLModelList;
    navigateFn: NavigateFunction;
};

export const ModelRegistryTable = ({ mlModelList, navigateFn }: ModelRegistryTableProps) => {
    return (
        <div className='mt-6'>
            {mlModelList.listMLModels.edges.length === 0 ? (
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
                        {mlModelList.listMLModels.edges.map((edge) => (
                            <TableRow
                                className='hover:cursor-pointer hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
                                key={edge.node.modelId}
                                onClick={() => navigateFn(`/dashboard/models/${edge.node.modelId}`)}
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
                                    <span className='inline-flex items-center gap-x-1.5 rounded-tremor-small bg-emerald-100 px-2 py-1 text-tremor-label font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-500 dark:ring-emerald-500/20'>
                                        <CircleIcon className='bg-emerald-500' />
                                        Live
                                    </span>
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
                                        navigateFn={navigateFn}
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
