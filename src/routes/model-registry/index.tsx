import { useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import type { Limit } from '@/types/Limit';

import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Card,
    CardFooter,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownItems,
    Input,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@/components/ui';

import { useListModels } from './api';

import { ArchiveModal } from './components';

export const ModelRegistry = () => {
    const [limit, setLimit] = useState<Limit>(10);
    const [continuationTokens, setContinuationTokens] = useState<(string | undefined)[]>([
        undefined,
    ]);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    const [selectedModel, setSelectedModel] = useState({
        modelId: '',
        modelName: '',
    });
    const [archiveModalOpen, setArchiveModalOpen] = useState(false);

    const navigate = useNavigate();

    const { data, loading, error, refetch, fetchMore } = useListModels({
        first: limit,
        onCompleted(data) {
            setHasPreviousPage(data.listMLModels.pageInfo.hasPreviousPage);
            setHasNextPage(data.listMLModels.pageInfo.hasNextPage);
            setContinuationTokens((tokens) => [
                ...tokens,
                data.listMLModels.pageInfo.continuationToken,
            ]);
        },
    });

    // TODO: Make UX Prettier
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className='w-full flex flex-col gap-12'>
                {/* Page Header */}
                <header className='flex flex-col gap-4'>
                    <div>
                        <Breadcrumbs>
                            <BreadcrumbItem href='/dashboard/home'>Dashboard</BreadcrumbItem>
                            <BreadcrumbItem href='/dashboard/models'>Models</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className='flex items-center justify-between gap-0'>
                        <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
                            Model Registry
                        </h2>
                        <Button onClick={() => navigate('/dashboard/models/create')} size='lg'>
                            Create
                        </Button>
                    </div>
                </header>
                {/* TODO: Add in indicator that lets user know there are no models current registered */}
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <div className='basis-1/4'>
                            <Input
                                onChange={(e) =>
                                    refetch({
                                        variables: {
                                            modelName: e.target.value,
                                        },
                                    })
                                }
                                placeholder='Search Models'
                            />
                        </div>
                        <Select
                            className='basis-1/6'
                            onChange={(e) => setLimit(parseInt(e.target.value) as Limit)}
                        >
                            <SelectItem value='10'>10 Results</SelectItem>
                            <SelectItem value='25'>25 Results</SelectItem>
                            <SelectItem value='50'>50 Results</SelectItem>
                        </Select>
                    </div>
                    {!loading ? (
                        <Card>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Name</TableHeaderCell>
                                        <TableHeaderCell className='text-right'>
                                            Total Versions
                                        </TableHeaderCell>
                                        <TableHeaderCell className='text-right'>
                                            Created By
                                        </TableHeaderCell>
                                        <TableHeaderCell className='text-right'>
                                            Last Modified
                                        </TableHeaderCell>
                                        <TableHeaderCell>
                                            <span className='sr-only'>Model Registry Actions</span>
                                        </TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data &&
                                        data.listMLModels &&
                                        data.listMLModels.edges.map((model) => (
                                            <TableRow
                                                className='hover:bg-gray-50 hover:cursor-pointer'
                                                key={model.node.modelId}
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/models/${model.node.modelId}`,
                                                    )
                                                }
                                            >
                                                <TableCell className='font-medium text-gray-900'>
                                                    {model.node.modelName}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    {(model.node.currentModelVersion &&
                                                        model.node.currentModelVersion
                                                            .numericVersion) ||
                                                        0}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    {model.node.createdBy.userName}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    {model.node.dateModified}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <Dropdown
                                                        menuButton={
                                                            <EllipsisHorizontalIcon className='h-6 w-6' />
                                                        }
                                                    >
                                                        <DropdownItems>
                                                            <DropdownItem>
                                                                <a
                                                                    href={`/dashboard/models/${model.node.modelId}/edit`}
                                                                >
                                                                    Edit
                                                                </a>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedModel({
                                                                            modelId:
                                                                                model.node.modelId,
                                                                            modelName:
                                                                                model.node
                                                                                    .modelName,
                                                                        });
                                                                        setArchiveModalOpen(true);
                                                                    }}
                                                                >
                                                                    Archive
                                                                </button>
                                                            </DropdownItem>
                                                            <Divider />
                                                            <DropdownItem>
                                                                <span className='text-indigo-600 font-semibold'>
                                                                    Publish
                                                                </span>
                                                            </DropdownItem>
                                                        </DropdownItems>
                                                    </Dropdown>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <CardFooter>
                                <div className='flex items-center justify-between'>
                                    {/* Dummy values */}
                                    <div />
                                    <div className='flex items-center gap-x-3'>
                                        <Button
                                            variant='secondary'
                                            disabled={hasPreviousPage}
                                            size='lg'
                                            onClick={() => {
                                                setContinuationTokens(
                                                    continuationTokens.filter(
                                                        (_, idx) =>
                                                            idx !== continuationTokens.length - 1,
                                                    ),
                                                );
                                                fetchMore({
                                                    variables: {
                                                        after: continuationTokens[
                                                            continuationTokens.length - 1
                                                        ],
                                                    },
                                                });
                                            }}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant='secondary'
                                            disabled={hasNextPage}
                                            size='lg'
                                            onClick={() =>
                                                fetchMore({
                                                    variables: {
                                                        after: continuationTokens[
                                                            continuationTokens.length - 1
                                                        ],
                                                    },
                                                })
                                            }
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ) : (
                        <BarLoader color='#4f46e5' width='250px' />
                    )}
                </div>
            </div>
            <ArchiveModal
                model={selectedModel}
                isOpen={archiveModalOpen}
                onClose={() => setArchiveModalOpen(false)}
            />
        </>
    );
};
