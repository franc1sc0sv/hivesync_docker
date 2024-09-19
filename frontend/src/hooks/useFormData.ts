import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_RESPONSE_ERROR_CLASS } from "../class/api_responses_instances";
import { useNotifications } from "../store/useNotifications";

export const useFormData = ({
  api_function,
  resetF = true,
  showSuccesNoti = false,
}: {
  api_function: (data?: any) => any;
  resetF?: boolean;
  showSuccesNoti?: boolean;
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState<any>(null);

  const { register, handleSubmit, reset } = useForm();
  const { setNotifications } = useNotifications();

  const onSubmit = async (data: any) => {
    try {
      setIsloading(true);
      const res = await api_function(data);
      setData(res);
      setIsloading(false);

      if (showSuccesNoti) {
        setNotifications({
          message: "Operacion completada con exito",
          severity: "success",
        });
      }

      if (resetF) {
        reset();
      }
    } catch (e) {
      if (e instanceof API_RESPONSE_ERROR_CLASS) {
        setNotifications({
          message: e.DATA.message,
          severity: "warning",
        });
        setIsloading(false);
        return;
      }

      setNotifications({
        message: "Error desconocido",
        severity: "error",
      });
      setIsloading(false);
    }
  };

  return { onSubmit: handleSubmit(onSubmit), register, isLoading, reset, data };
};
