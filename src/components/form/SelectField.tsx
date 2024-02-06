import { forwardRef } from 'react';
import { Select, SelectItem } from '@tremor/react';
import { useController } from 'react-hook-form';

import { useFormField, type UseFormFieldProps } from '@/hooks';

import { FieldWrapper } from './FieldWrapper';

type Option = {
    label: string;
    id: string;
    value: string;
};

export type SelectFieldProps = UseFormFieldProps &
    Omit<React.ComponentProps<typeof Select>, 'children'> & {
        defaultValue?: string;
        name: string;
        options: Option[];
    };

export const SelectField = forwardRef<React.ElementRef<typeof Select>, SelectFieldProps>(
    (props, ref) => {
        const { formFieldProps } = useFormField(props);
        const { field, fieldState } = useController(props);

        return (
            <FieldWrapper {...formFieldProps}>
                <Select
                    defaultValue={props.defaultValue}
                    error={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                    onValueChange={field.onChange}
                    ref={ref}
                >
                    {props.options.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>
            </FieldWrapper>
        );
    },
);
SelectField.displayName = 'SelectField';
