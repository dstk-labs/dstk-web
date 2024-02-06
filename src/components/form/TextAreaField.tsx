import { forwardRef } from 'react';
import { Textarea, type TextareaProps } from '@tremor/react';

import { UseFormFieldProps, useFormField } from '@/hooks';

import { FieldWrapper } from './FieldWrapper';

export type TextAreaFieldProps = UseFormFieldProps & TextareaProps & { name: string };

export const TextAreaField = forwardRef<React.ElementRef<typeof Textarea>, TextAreaFieldProps>(
    (props, ref) => {
        const { childProps, formFieldProps } = useFormField(props);

        return (
            <FieldWrapper {...formFieldProps}>
                <Textarea
                    error={childProps.error}
                    errorMessage={childProps.errorMessage}
                    ref={ref}
                    {...childProps}
                />
            </FieldWrapper>
        );
    },
);
TextAreaField.displayName = 'TextAreaField';
