import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

export type Props<T extends FieldValues> = Omit<React.ComponentProps<'form'>, 'onSubmit'> & {
    form: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
};

export const Form = <T extends FieldValues>({ children, form, onSubmit, ...props }: Props<T>) => {
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
                <fieldset disabled={form.formState.isSubmitting}>{children}</fieldset>
            </form>
        </FormProvider>
    );
};
