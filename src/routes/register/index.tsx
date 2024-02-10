import { Button, Card, TextInput } from '@tremor/react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { useZodForm } from '@/hooks';
import { FieldWrapper, Form } from '@/components/form';
import { Logo } from '@/components/logo';

import { useCreateAccount } from './api';

const schema = z
    .object({
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        email: z.string().email('Email is required.'),
        password: z.string().min(1, 'Password is required.'),
        name: z.string().min(1, 'Name is required'),
        userName: z.string().min(1, 'User name is required.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match.',
    });

export const Register = () => {
    const [createAccount, { loading }] = useCreateAccount();

    const form = useZodForm({ schema });

    const onSubmit = () => {
        const { email, password, name, userName } = form.getValues();

        createAccount({
            variables: {
                data: {
                    email: email,
                    password: password,
                    realName: name,
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
                    <div className='max-w-md'>
                        <h3 className='text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                            Create New Account
                        </h3>
                    </div>
                </div>
                <Card className='mt-2 sm:max-w-md'>
                    <Form
                        className='flex flex-col gap-8'
                        form={form}
                        id='create-account'
                        onSubmit={onSubmit}
                    >
                        <div className='flex flex-col gap-4'>
                            <FieldWrapper label='Name'>
                                <TextInput
                                    autoComplete='name'
                                    error={Boolean(form.formState.errors.name)}
                                    errorMessage={form.formState.errors.name?.message}
                                    placeholder=''
                                    {...form.register('name')}
                                />
                            </FieldWrapper>
                            <FieldWrapper label='User Name'>
                                <TextInput
                                    autoComplete='user-name'
                                    error={Boolean(form.formState.errors.userName)}
                                    errorMessage={form.formState.errors.userName?.message}
                                    placeholder=''
                                    {...form.register('userName')}
                                />
                            </FieldWrapper>
                            <FieldWrapper label='Email'>
                                <TextInput
                                    autoComplete='email'
                                    error={Boolean(form.formState.errors.email)}
                                    errorMessage={form.formState.errors.email?.message}
                                    placeholder=''
                                    type='email'
                                    {...form.register('email')}
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
                            <FieldWrapper label='Confirm Password'>
                                <TextInput
                                    error={Boolean(form.formState.errors.confirmPassword)}
                                    errorMessage={form.formState.errors.confirmPassword?.message}
                                    placeholder='********'
                                    type='password'
                                    {...form.register('confirmPassword')}
                                />
                            </FieldWrapper>
                        </div>
                        <Button
                            disabled={!form.formState.isValid}
                            form='create-account'
                            loading={loading}
                            type='submit'
                        >
                            Create Account
                        </Button>
                        <p className='text-center text-tremor-label text-tremor-content dark:text-dark-tremor-content'>
                            By signing in, you agree to our{' '}
                            <Link
                                className='capitalize text-tremor-brand hover:text-tremor-brand-emphasis dark:text-dark-tremor-brand hover:dark:text-dark-tremor-brand-emphasis'
                                to='/'
                            >
                                Terms of use
                            </Link>{' '}
                            and{' '}
                            <Link
                                className='capitalize text-tremor-brand hover:text-tremor-brand-emphasis dark:text-dark-tremor-brand hover:dark:text-dark-tremor-brand-emphasis'
                                to='/'
                            >
                                Privacy policy
                            </Link>
                        </p>
                    </Form>
                </Card>
                <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
                    Already have an account?{' '}
                    <Link
                        className='font-medium text-tremor-brand hover:text-tremor-brand-emphasis dark:text-dark-tremor-brand hover:dark:text-dark-tremor-brand-emphasis'
                        to='/login'
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </>
    );
};
