import { ArchiveBoxIcon, PencilSquareIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { Button } from '@tremor/react';
import { useSetAtom } from 'jotai';
import type { NavigateFunction } from 'react-router-dom';

import { archiveModalOpenAtom, selectedModelAtom } from '../atoms';

type ModelRegistryActionsProps = {
    navigateFn: NavigateFunction;
    modelId: string;
    modelName: string;
};

export const ModelRegistryActions = ({
    navigateFn,
    modelId,
    modelName,
}: ModelRegistryActionsProps) => {
    const setArchiveModalOpen = useSetAtom(archiveModalOpenAtom);
    const setSelectedModel = useSetAtom(selectedModelAtom);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        navigateFn(`/dashboard/models/${modelId}/edit`);
    };

    const handleArchive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setSelectedModel({
            modelId: modelId,
            modelName: modelName,
        });
        setArchiveModalOpen(true);
    };

    const handlePublish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        console.log('TO DA MOON BABY 🚀');
    };

    return (
        <div className='flex items-center gap-2'>
            <Button
                className='bg-tremor-background border border-tremor-border text-tremor-content hover:text-tremor-brand hover:bg-tremor-background-subtle dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:text-dark-tremor-content dark:hover:text-dark-tremor-brand dark:hover:bg-dark-tremor-background-subtle'
                icon={PencilSquareIcon}
                onClick={(e) => handleEdit(e)}
                size='xs'
                tooltip='Edit'
                variant='secondary'
            />
            <Button
                className='bg-tremor-background border border-tremor-border text-tremor-content hover:text-tremor-brand hover:bg-tremor-background-subtle dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:text-dark-tremor-content dark:hover:text-dark-tremor-brand dark:hover:bg-dark-tremor-background-subtle'
                icon={ArchiveBoxIcon}
                onClick={(e) => handleArchive(e)}
                size='xs'
                tooltip='Archive'
                variant='secondary'
            />
            <Button
                className='bg-tremor-background border border-tremor-border text-tremor-content hover:text-tremor-brand hover:bg-tremor-background-subtle dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:text-dark-tremor-content dark:hover:text-dark-tremor-brand dark:hover:bg-dark-tremor-background-subtle'
                icon={RocketLaunchIcon}
                onClick={(e) => handlePublish(e)}
                size='xs'
                tooltip='Publish'
                variant='secondary'
            />
        </div>
    );
};
