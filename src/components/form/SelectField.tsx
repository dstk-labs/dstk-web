import { Select, SelectItem, type SelectProps } from '@tremor/react';

import { UseFormFieldProps, useFormField } from '@/hooks';

import { FieldWrapper } from './FieldWrapper';

type Option = {
    label: string;
    id: string;
    value: string;
};

export type SelectFieldProps = UseFormFieldProps &
    SelectProps & { name: string; options: Option[] };

export const SelectField = (props: SelectFieldProps) => {
    const { childProps, formFieldProps } = useFormField(props);

    return (
        <FieldWrapper {...formFieldProps}>
            <Select {...childProps}>
                {props.options.map((option) => (
                    <SelectItem key={option.id} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </FieldWrapper>
    );
};
