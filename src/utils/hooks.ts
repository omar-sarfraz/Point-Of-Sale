import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";

export const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();

    return {
        contextHolder,
        notify: (type: NotificationType, message: string, description: string) => {
            api[type]({
                message,
                description,
            });
        },
    };
};
