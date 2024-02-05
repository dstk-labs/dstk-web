import { Button, Select, SelectItem } from '@tremor/react';

import { LIMITS } from '@/constants/limits';

export type PaginationProps = {
    handlePrevPage: () => void;
    handleNextPage: () => void;
    handleSelect: (value: string) => void;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    limit: number;
};

export const Pagination = ({
    handlePrevPage,
    handleNextPage,
    handleSelect,
    hasPreviousPage,
    hasNextPage,
    limit,
}: PaginationProps) => {
    return (
        <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center sm:gap-0'>
            <Select
                className='sm:w-fit'
                onValueChange={(value) => handleSelect(value)}
                value={limit.toString()}
            >
                {LIMITS.map((limit) => (
                    <SelectItem key={limit} value={limit.toString()}>
                        {limit} Results
                    </SelectItem>
                ))}
            </Select>
            <div className='flex justify-between sm:justify-start sm:items-center sm:gap-4'>
                <Button
                    disabled={!hasPreviousPage}
                    onClick={() => handlePrevPage()}
                    variant='light'
                >
                    &larr; Prev
                </Button>
                <Button disabled={!hasNextPage} onClick={() => handleNextPage()} variant='light'>
                    Next &rarr;
                </Button>
            </div>
        </div>
    );
};
