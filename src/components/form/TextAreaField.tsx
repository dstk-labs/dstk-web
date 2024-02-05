import { Textarea, type TextareaProps } from '@tremor/react';

import { UseFormFieldProps, useFormField } from '@/hooks';

import { FieldWrapper } from './FieldWrapper';

export type TextAreaFieldProps = UseFormFieldProps & TextareaProps & { name: string };

export const TextAreaField = (props: TextAreaFieldProps) => {
    const { childProps, formFieldProps } = useFormField(props);

    return (
        <FieldWrapper {...formFieldProps}>
            <Textarea {...childProps} />
        </FieldWrapper>
    );
};
