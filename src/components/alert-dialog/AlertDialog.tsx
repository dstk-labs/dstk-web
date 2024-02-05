import { Dialog, DialogPanel } from '@tremor/react';

export type AlertDialogProps = React.ComponentProps<typeof DialogPanel> &
    Pick<React.ComponentProps<typeof Dialog>, 'onClose' | 'open'>;

export const AlertDialog = ({ children, className, onClose, open, ...props }: AlertDialogProps) => {
    return (
        <Dialog onClose={onClose} open={open} className='z-[100]'>
            <DialogPanel className={className} {...props}>
                {children}
            </DialogPanel>
        </Dialog>
    );
};
