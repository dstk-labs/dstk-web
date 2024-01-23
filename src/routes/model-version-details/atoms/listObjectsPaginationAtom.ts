import { atom } from 'jotai';
import type { Limit } from '@/types/Limit';

type ListObjectsPaginationInput = {
    first: Limit;
    continuationTokens: (string | undefined)[];
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    prefix?: string;
};

export const listObjectsPaginationAtom = atom<ListObjectsPaginationInput>({
    first: 10,
    continuationTokens: [undefined],
    hasPreviousPage: false,
    hasNextPage: false,
    prefix: undefined,
});
