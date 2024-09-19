import { useContext } from "react";
import { NotificationContext } from "./NotificationsContext";

export const useNotificationsContext = () => {
  const context = useContext(NotificationContext);
  return { ...context };
};
