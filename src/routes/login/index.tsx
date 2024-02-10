import { Button, Card, TextInput } from '@tremor/react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { useLogin, useZodForm } from '@/hooks';
import { FieldWrapper, Form } from '@/components/form';
import { Logo } from '@/components/logo';

const schema = z.object({
    password: z.string().min(1, 'Password is required.'),
    userName: z.string().min(1, 'User name is required.'),
});

export const Login = () => {
    const [login, { loading }] = useLogin();

    const form = useZodForm({ schema });

    const onSubmit = () => {
        const { password, userName } = form.getValues();

        login({
            variables: {
                data: {
                    password: password,
                    userName: userName,
                },
            },
        });
    };

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col gap-6 items-center px-4 py-10 lg:px-6'>
                <div className='flex flex-col gap-6 items-center'>
                    <Logo className='h-10 w-10' />
                    <div className='flex flex-col items-center max-w-md'>
                        <h3 className='text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                            Welcome Back
                        </h3>
                        <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
                            Enter your credentials to access your account.
                        </p>
                    </div>
                </div>
                <Card className='mt-2 sm:max-w-md'>
                    <Form
                        className='flex flex-col gap-8'
                        form={form}
                        id='login'
                        onSubmit={onSubmit}
                    >
                        <div className='flex flex-col gap-4'>
                            <FieldWrapper label='User Name'>
                                <TextInput
                                    autoComplete='user-name'
                                    error={Boolean(form.formState.errors.userName)}
                                    errorMessage={form.formState.errors.userName?.message}
                                    placeholder=''
                                    {...form.register('userName')}
                                />
                            </FieldWrapper>
                            <FieldWrapper label='Password'>
                                <TextInput
                                    autoComplete='password'
                                    error={Boolean(form.formState.errors.password)}
                                    errorMessage={form.formState.errors.password?.message}
                                    placeholder='********'
                                    type='password'
                                    {...form.register('password')}
                                />
                            </FieldWrapper>
                        </div>
                        <Button
                            disabled={!form.formState.isValid}
                            form='login'
                            loading={loading}
                            type='submit'
                        >
                            Log in
                        </Button>
                        <p className='text-center text-tremor-label text-tremor-content dark:text-dark-tremor-content'>
                            Forgot your password?{' '}
                            <Link
                                className='text-tremor-brand hover:text-tremor-brand-emphasis dark:text-dark-tremor-brand hover:dark:text-dark-tremor-brand-emphasis'
                                to='/'
                            >
                                Reset password
                            </Link>
                        </p>
                    </Form>
                </Card>
                <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
                    Need to make an account?{' '}
                    <Link
                        className='font-medium text-tremor-brand hover:text-tremor-brand-emphasis dark:text-dark-tremor-brand hover:dark:text-dark-tremor-brand-emphasis'
                        to='/register'
                    >
                        Register Here
                    </Link>
                </p>
            </div>
        </>
    );
};
