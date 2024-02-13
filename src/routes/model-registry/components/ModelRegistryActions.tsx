import { ArchiveBoxIcon, PencilSquareIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useSetAtom } from 'jotai';
import { type NavigateFunction } from 'react-router-dom';

import { CustomButton } from '@/components/custom-button';

import { archiveModalOpenAtom, selectedModelAtom } from '../atoms';

type ModelRegistryActionsProps = {
    modelId: string;
    modelName: string;
    navigateFn: NavigateFunction;
};

export const ModelRegistryActions = ({
    modelId,
    modelName,
    navigateFn,
}: ModelRegistryActionsProps) => {
    const setArchiveModalOpen = useSetAtom(archiveModalOpenAtom);
    const setSelectedModel = useSetAtom(selectedModelAtom);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        navigateFn(`/dashboard/models/${modelId}/edit`);
    };

    const handleArchive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        setSelectedModel({
            modelId: modelId,
            modelName: modelName,
        });
        setArchiveModalOpen(true);
    };

    const handlePublish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('TO DA MOON BABY 🚀');
    };

    return (
        <div className='flex items-center gap-2'>
            <CustomButton
                customVariant='outline'
                icon={PencilSquareIcon}
                onClick={(e) => handleEdit(e)}
                size='xs'
                tooltip='Edit'
                variant='secondary'
            />
            <CustomButton
                customVariant='outline'
                icon={ArchiveBoxIcon}
                onClick={(e) => handleArchive(e)}
                size='xs'
                tooltip='Archive'
                variant='secondary'
            />
            <CustomButton
                customVariant='outline'
                icon={RocketLaunchIcon}
                onClick={(e) => handlePublish(e)}
                size='xs'
                tooltip='Publish'
                variant='secondary'
            />
        </div>
    );
};
