import { useReadQuery, type OperationVariables, type QueryReference } from '@apollo/client';
import { Button, Select, SelectItem } from '@tremor/react';
import { useSetAtom } from 'jotai';

import { LIMITS } from '@/constants/limits';
import { type MLModelList } from '@/types/MLModel';

import { continuationTokensAtom } from '../atoms';

type ModelRegistryPaginationProps = {
    isPending: boolean;
    onRefetch: (variables?: Partial<OperationVariables> | undefined) => void;
    queryRef: QueryReference<MLModelList>;
};

export const ModelRegistryPagination = ({
    isPending,
    onRefetch,
    queryRef,
}: ModelRegistryPaginationProps) => {
    const setContinuationTokens = useSetAtom(continuationTokensAtom);

    const { data } = useReadQuery(queryRef);

    return (
        <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center sm:gap-0'>
            <Select
                className='sm:w-fit'
                defaultValue={LIMITS[0].toString()}
                disabled={isPending}
                onValueChange={(value) => onRefetch({ first: parseInt(value) })}
            >
                {LIMITS.map((limit) => (
                    <SelectItem key={limit} value={limit.toString()}>
                        {limit} Results
                    </SelectItem>
                ))}
            </Select>
            <div className='flex justify-between sm:justify-start sm:items-center sm:gap-4'>
                <Button
                    disabled={!data.listMLModels.pageInfo.hasPreviousPage || isPending}
                    onClick={() => setContinuationTokens((tokens) => tokens.slice(0, -1))}
                    variant='light'
                >
                    &larr; Prev
                </Button>
                <Button
                    disabled={!data.listMLModels.pageInfo.hasNextPage || isPending}
                    onClick={() =>
                        setContinuationTokens((tokens) => [
                            ...tokens,
                            data.listMLModels.pageInfo.continuationToken,
                        ])
                    }
                    variant='light'
                >
                    Next &rarr;
                </Button>
            </div>
        </div>
    );
};
