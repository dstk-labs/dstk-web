import { Skeleton } from '@/components/skeleton';

export const ModelRegistryCardsLoading = () => {
    return (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <Skeleton className='h-[175px] sm:h-[350px] w-[350px]' />
            <Skeleton className='h-[175px] sm:h-[350px] w-[350px]' />
            <Skeleton className='h-[175px] sm:h-[350px] w-[350px]' />
        </div>
    );
};
