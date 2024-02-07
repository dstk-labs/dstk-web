import { Skeleton } from '@/components/skeleton';

export const ModelVersionTableLoading = () => {
    return (
        <div className='mt-6 flex flex-col gap-4'>
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
        </div>
    );
};
