import { Button, Textarea } from '@tremor/react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useZodForm } from '@/hooks';
import { FieldWrapper, Form } from '@/components/form';

import { useCreateModelVersion } from '../api/createModelVersion';

const schema = z.object({
    description: z.string().optional(),
});

type CreateModelVersionFormProps = {
    modelId: string;
};

export const CreateModelVersionForm = ({ modelId }: CreateModelVersionFormProps) => {
    const navigate = useNavigate();

    const form = useZodForm({ schema });

    const [createModelVersion, { loading }] = useCreateModelVersion();

    const onSubmit = () => {
        const { description } = form.getValues();
        createModelVersion({
            variables: {
                data: {
                    description: description,
                    modelId: modelId,
                },
            },
        });
    };

    return (
        <>
            <Form form={form} id='create-model-version' onSubmit={onSubmit}>
                <FieldWrapper label='Description'>
                    <Textarea
                        error={Boolean(form.formState.errors.description)}
                        errorMessage={form.formState.errors.description?.message}
                        placeholder=''
                        rows={4}
                        {...form.register('description')}
                    />
                </FieldWrapper>
            </Form>
            <div className='w-full flex items-center justify-end gap-4 mt-4'>
                <Button
                    className='whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong hover:text-text-tremor-default hover:dark:text-dark-tremor-content-strong'
                    onClick={() => navigate(`/dashboard/models/`)}
                    variant='light'
                >
                    Cancel
                </Button>
                <Button form='create-model-version' loading={loading} type='submit'>
                    Submit
                </Button>
            </div>
        </>
    );
};
