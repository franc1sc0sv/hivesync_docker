import { createContext, ReactNode, useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { get_all_notifications } from "../../../../api/notifications";
import { LoadingPage } from "../../../../components/routes/loadingPage";
import {
  Categories,
  Category,
  NotificationProps,
} from "../types/NotificationProps";

interface NotificationsContextProps {
  notifications: NotificationProps[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationProps[]>>;
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  handleCategoryClick: (category: Category) => void;
  categories: Categories;
}

export const NotificationContext = createContext<NotificationsContextProps>({
  category: "all",
  notifications: [],
  setCategory: () => {},
  setNotifications: () => {},
  handleCategoryClick: () => {},
  categories: [],
});

const transform_data = (data: any) => {
  return data.map((notification: any) => {
    return {
      id: notification.id,
      message: notification.message,
      category: notification.category,
      data: JSON.parse(notification.json_data),
      createdAt: notification.createdAt,
      to_user_id: notification.to_user_id,
    };
  });
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { fecthData, isLoading } = useFetch({
    api_function: get_all_notifications,
    transformData: transform_data,
  });

  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [category, setCategory] = useState<Category>("all");

  const categories: Categories = [
    { name: "todo", id: "all" },
    { name: "solicitudes", id: "request" },
    { name: "invitaciones", id: "invitation" },
    { name: "mensajes", id: "messages" },
  ];

  const handleCategoryClick = (category: Category) => {
    setCategory(category);
  };

  useEffect(() => {
    const fetcher = async () => {
      const data = await fecthData();
      setNotifications(data);
    };
    fetcher();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        category,
        setNotifications,
        setCategory,
        handleCategoryClick,
        categories,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
