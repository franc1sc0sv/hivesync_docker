import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "../store/user";
import { useNotifications } from "../store/useNotifications";

export const useSendMessage = (send_message: (datos: any) => {}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { user } = useSession();
  const [isLoading, setIsloading] = useState(false);

  const { setNotifications } = useNotifications();
  const onSubmit = async (data: any) => {
    try {
      setIsloading(true);

      const datos = {
        userId: user?.id,
        message: data.message,
        roomId: data.room,
      };

      send_message(datos);

      setIsloading(false);
      reset();
    } catch (e) {
      setNotifications({
        message: "Error desconocido",
        severity: "error",
      });
      setIsloading(false);
    }
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    isLoading,
    reset,
    setValue,
  };
};
