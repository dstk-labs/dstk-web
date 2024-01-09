import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const selectVariants = cva(
    'block w-full bg-white outline border border-r-8 border-transparent rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-40 disabled:cursor-not-allowed disabled:bg-gray-50',
    {
        variants: {
            variant: {
                primary:
                    'outline-gray-200 text-gray-700 focus:outline-blue-400 focus:ring-blue-300',
                error: 'outline-red-300 text-red-600 focus:outline-red-300 focus:ring-red-200',
            },
            size: {
                xs: 'px-3 py-1 text-xs',
                sm: 'px-4 py-1.5 text-sm',
                md: 'px-5 py-2 text-sm',
                lg: 'px-6 py-2.5 text-base',
                xl: 'px-8 py-3 text-lg',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

export type SelectProps = {
    children?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement> &
    VariantProps<typeof selectVariants>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ children, className, size, variant, ...props }, ref) => {
        return (
            <select
                className={cn(selectVariants({ size, variant, className }))}
                ref={ref}
                {...props}
            >
                {children}
            </select>
        );
    },
);

Select.displayName = 'Select';
