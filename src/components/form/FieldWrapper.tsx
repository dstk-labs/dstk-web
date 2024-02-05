import { UseFormFieldProps } from '@/hooks';
import { Label } from '../label';

export type FormFieldProps = UseFormFieldProps & {
    id: string;
};

export const FieldWrapper = ({ children, id, label }: FormFieldProps) => {
    return (
        <div className='flex flex-col gap-2'>
            {label && <Label htmlFor={id}>{label}</Label>}
            {children}
        </div>
    );
};
