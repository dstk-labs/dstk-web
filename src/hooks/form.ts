import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormProps } from 'react-hook-form';
import type { TypeOf, ZodSchema } from 'zod';

type UseZodFormProps<Z extends ZodSchema> = Exclude<UseFormProps<TypeOf<Z>>, 'resolver'> & {
    schema: Z;
};

export const useZodForm = <Z extends ZodSchema>({ schema, ...formProps }: UseZodFormProps<Z>) => {
    return useForm({
        ...formProps,
        resolver: zodResolver(schema),
    });
};

export type UseFormFieldProps = React.PropsWithChildren & {
    name: string;
    label?: string;
};

export const useFormField = <P extends UseFormFieldProps>({ label, name, ...props }: P) => {
    const id = name;

    return {
        formFieldProps: { label, id, name },
        childProps: { ...props, id, name },
    };
};
