import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from '@tremor/react';

import { UseFormFieldProps, useFormField } from '@/hooks';

import { FieldWrapper } from './FieldWrapper';

export type InputFieldProps = UseFormFieldProps & TextInputProps & { name: string };

export const InputField = forwardRef<React.ElementRef<typeof TextInput>, InputFieldProps>(
    (props, ref) => {
        const { childProps, formFieldProps } = useFormField(props);

        return (
            <FieldWrapper {...formFieldProps}>
                <TextInput ref={ref} {...childProps} />
            </FieldWrapper>
        );
    },
);
InputField.displayName = 'InputField';
