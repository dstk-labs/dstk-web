import { useState } from 'react';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { Button } from '@tremor/react';

type ModelVersionCopyIDProps = {
    modelVersionID: string;
};

export const ModelVersionCopyID = ({ modelVersionID }: ModelVersionCopyIDProps) => {
    const [isCopying, setIsCopying] = useState(false);

    const handleCopy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsCopying(true);

        navigator.clipboard.writeText(modelVersionID);

        setTimeout(() => {
            setIsCopying(false);
        }, 750);
    };

    return (
        <Button
            className='bg-tremor-background border border-tremor-border text-tremor-content hover:text-tremor-brand hover:bg-tremor-background-subtle dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:text-dark-tremor-content dark:hover:text-dark-tremor-brand dark:hover:bg-dark-tremor-background-subtle'
            onClick={(e) => handleCopy(e)}
            icon={isCopying ? CheckIcon : ClipboardIcon}
            size='xs'
            tooltip={isCopying ? 'Copied!' : 'Copy Model Version ID'}
            variant='secondary'
        />
    );
};
