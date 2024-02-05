import { TextInput } from '@tremor/react';
import { useAtom } from 'jotai';
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

import { archiveModalOpenAtom, selectedModelAtom } from '../atoms';
import { useArchiveModel } from '../api';

export const ArchiveModal = () => {
    const [archiveModalOpen, setArchiveModelOpen] = useAtom(archiveModalOpenAtom);
    const [selectedModel, setSelectedModel] = useAtom(selectedModelAtom);

    const [archiveModel, { loading }] = useArchiveModel();

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
        });
        setArchiveModelOpen(false);
        form.reset();
    };

    return (
        <AlertDialog onClose={() => setArchiveModelOpen(false)} open={archiveModalOpen}>
            <AlertDialogClose onClose={handleClose} />
            <AlertDialogTitle>{selectedModel.modelName}</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to perform this action? Edits can no longer be made to a model
                once it is archived.
            </AlertDialogDescription>
            <AlertDialogBody>
                <Label>Model name</Label>
                <TextInput placeholder={selectedModel.modelName} className='mt-2' disabled />
                <Form className='mt-4' form={form} id='archive-model' onSubmit={onSubmit}>
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
