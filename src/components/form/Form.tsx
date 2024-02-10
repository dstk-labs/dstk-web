import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

export type Props<T extends FieldValues> = Omit<React.ComponentProps<'form'>, 'onSubmit'> & {
    form: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
};

export const Form = <T extends FieldValues>({
    children,
    className,
    form,
    onSubmit,
    ...props
}: Props<T>) => {
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
                <fieldset className={className} disabled={form.formState.isSubmitting}>
                    {children}
                </fieldset>
            </form>
        </FormProvider>
    );
};
