import { Divider } from '@tremor/react';

export type AlertDialogFooterProps = {
    children: React.ReactNode;
};

export const AlertDialogFooter = ({ children }: AlertDialogFooterProps) => {
    return (
        <>
            <Divider />
            <div className='flex justify-end space-x-2'>{children}</div>
        </>
    );
};
