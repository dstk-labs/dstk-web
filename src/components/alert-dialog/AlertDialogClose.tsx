import { RiCloseLine } from '@remixicon/react';

export type AlertDialogCloseProps = {
    onClose: () => void;
};

export const AlertDialogClose = ({ onClose }: AlertDialogCloseProps) => {
    return (
        <div className='absolute right-0 top-0 pr-3 pt-3'>
            <button
                type='button'
                className='rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content'
                onClick={onClose}
                aria-label='Close'
            >
                <RiCloseLine className='h-5 w-5 shrink-0' aria-hidden={true} />
            </button>
        </div>
    );
};
