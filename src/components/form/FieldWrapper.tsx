import { Label } from '../label';

export type FormFieldProps = React.ComponentProps<'div'> & {
    label?: string;
};

export const FieldWrapper = ({ children, label }: FormFieldProps) => {
    return (
        <div className='flex flex-col gap-2'>
            {label && <Label>{label}</Label>}
            {children}
        </div>
    );
};
