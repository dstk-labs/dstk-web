import { useAtom } from 'jotai';

import { Pagination } from '@/components/pagination';
import type { Limit } from '@/types/Limit';

import { modelVersionPaginationAtom } from '../atoms';

type ModelVersionPaginationProps = {
    continuationToken: string;
};

export const ModelVersionPagination = ({ continuationToken }: ModelVersionPaginationProps) => {
    const [inputs, setInputs] = useAtom(modelVersionPaginationAtom);

    const handlePrevPage = () =>
        setInputs((values) => ({
            ...values,
            continuationTokens: values.continuationTokens.slice(0, -1),
        }));

    const handleNextPage = () =>
        setInputs((values) => ({
            ...values,
            continuationTokens: [...values.continuationTokens, continuationToken],
        }));

    const handleSelect = (value: string) =>
        setInputs((values) => ({
            ...values,
            first: parseInt(value) as Limit,
        }));

    return (
        <Pagination
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handleSelect={handleSelect}
            hasPreviousPage={inputs.hasPreviousPage}
            hasNextPage={inputs.hasNextPage}
            limit={inputs.first}
        />
    );
};
