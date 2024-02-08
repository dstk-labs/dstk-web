import { Skeleton } from '@/components/skeleton';

export const TeamCardsLoading = () => {
    return (
        <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <Skeleton className='h-[150px] w-full' />
            <Skeleton className='h-[150px] w-full' />
            <Skeleton className='h-[150px] w-full' />
        </div>
    );
};
