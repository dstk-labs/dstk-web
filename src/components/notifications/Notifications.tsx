import { useNotificationStore } from '@/stores';

import { Notification } from '../ui';

export const Notifications = () => {
    const { notifications, dismissNotification } = useNotificationStore();

    return (
        <div className='z-50 flex flex-col fixed inset-0 space-y-4 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start'>
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    notification={notification}
                    onDismiss={dismissNotification}
                />
            ))}
        </div>
    );
};
