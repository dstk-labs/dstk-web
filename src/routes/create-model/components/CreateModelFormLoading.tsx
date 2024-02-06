import { Skeleton } from '@/components/skeleton';

const FieldSkeleton = () => <Skeleton className='w-full h-8' />;

export const CreateModelFormLoading = () => {
    return (
        <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
                <FieldSkeleton />
            </div>
            <div className='sm:col-span-3'>
                <FieldSkeleton />
            </div>
            <div className='sm:col-span-3'>
                <FieldSkeleton />
            </div>
            <div className='sm:col-span-3'>
                <FieldSkeleton />
            </div>
            <div className='col-span-full'>
                <FieldSkeleton />
            </div>
        </div>
    );
};
