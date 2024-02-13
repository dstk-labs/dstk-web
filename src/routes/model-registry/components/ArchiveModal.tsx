import { gql, useMutation, type TypedDocumentNode } from '@apollo/client';
import { TextInput } from '@tremor/react';
import { useAtom } from 'jotai';
import { toast } from 'sonner';
import { z } from 'zod';

import { useZodForm } from '@/hooks';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCancelButton,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogSubmitButton,
    AlertDialogTitle,
} from '@/components/alert-dialog';
import { Form, InputField } from '@/components/form';
import { Label } from '@/components/label';
import type { ArchiveMLModel } from '@/types/MLModel';

import { archiveModalOpenAtom, selectedModelAtom } from '../atoms';

const ARCHIVE_MODEL: TypedDocumentNode<ArchiveMLModel> = gql`
    mutation ArchiveModel($modelId: String!) {
        archiveModel(modelId: $modelId) {
            isArchived
            modelName
        }
    }
`;

export const ArchiveModal = () => {
    const [archiveModalOpen, setArchiveModelOpen] = useAtom(archiveModalOpenAtom);
    const [selectedModel, setSelectedModel] = useAtom(selectedModelAtom);

    const [archiveModel, { loading }] = useMutation(ARCHIVE_MODEL);

    const schema = z
        .object({ modelName: z.string() })
        .refine((data) => data.modelName === selectedModel.modelName);

    const form = useZodForm({ schema });

    const { isDirty, isValid } = form.formState;

    const handleClose = () => {
        setArchiveModelOpen(false);
        setSelectedModel({
            modelId: '',
            modelName: '',
        });
        form.reset();
    };

    const onSubmit = () => {
        archiveModel({
            variables: {
                modelId: selectedModel.modelId,
            },
            refetchQueries: ['ListMLModels'],
            onCompleted: (data) => {
                form.reset();
                setArchiveModelOpen(false);
                toast.info(
                    `${data.archiveModel.modelName} ${
                        data.archiveModel.isArchived ? 'has been archived' : 'is no longer archived'
                    }.`,
                );
            },
        });
    };

    return (
        <AlertDialog onClose={() => setArchiveModelOpen(false)} open={archiveModalOpen}>
            <AlertDialogClose onClose={handleClose} />
            <AlertDialogTitle>{selectedModel.modelName}</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to perform this action? Edits can no longer be made to a model
                once it is archived.
            </AlertDialogDescription>
            <AlertDialogBody className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <Label>Model Name</Label>
                    <TextInput placeholder={selectedModel.modelName} disabled />
                </div>
                <Form form={form} id='archive-model' onSubmit={onSubmit}>
                    <InputField
                        label='Confirm Model Name'
                        placeholder={selectedModel.modelName}
                        {...form.register('modelName')}
                    />
                </Form>
            </AlertDialogBody>
            <AlertDialogFooter>
                <AlertDialogCancelButton onClose={handleClose}>Cancel</AlertDialogCancelButton>
                <AlertDialogSubmitButton
                    disabled={!isDirty || !isValid}
                    form='archive-model'
                    loading={loading}
                >
                    Archive
                </AlertDialogSubmitButton>
            </AlertDialogFooter>
        </AlertDialog>
    );
};
