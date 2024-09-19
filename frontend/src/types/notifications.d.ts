import { AlertColor } from "@mui/material";

type NotificationItem = {
  severity: AlertColor;
  message: string;
};

type Notifications = {
  notifications: NotificationItem[];
  setNotifications: (notification: NotificationItem) => void;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
};
