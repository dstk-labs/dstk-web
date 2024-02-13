import { Button } from '@tremor/react';

type CustomButtonVariantNames = 'outline';

const customButtonVariantClassNames = {
    outline:
        'bg-tremor-background border border-tremor-border text-tremor-content hover:text-tremor-brand hover:bg-tremor-background-subtle dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:text-dark-tremor-content dark:hover:text-dark-tremor-brand dark:hover:bg-dark-tremor-background-subtle',
};

export type CustomButtonProps = React.ComponentProps<typeof Button> & {
    customVariant: CustomButtonVariantNames;
};

export const CustomButton = ({ children, customVariant, ...props }: CustomButtonProps) => {
    return (
        <Button className={customButtonVariantClassNames[customVariant]} {...props}>
            {children}
        </Button>
    );
};
