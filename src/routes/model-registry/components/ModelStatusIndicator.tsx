import { RiCircleFill } from '@remixicon/react';
import { Badge } from '@tremor/react';

const IndicatorIcon = () => <RiCircleFill className='h-1.5 w-1.5 mr-1.5' />;

type ModelStatusIndicatorProps = {
    isArchived: boolean;
};

export const ModelStatusIndicator = ({ isArchived }: ModelStatusIndicatorProps) => {
    return (
        <Badge
            className='rounded-tremor-small'
            color={isArchived ? 'red' : 'emerald'}
            icon={IndicatorIcon}
        >
            {isArchived ? 'Archived' : 'Live'}
        </Badge>
    );
};
