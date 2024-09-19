import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_RESPONSE_ERROR_CLASS } from "../class/api_responses_instances";
import { useNotifications } from "../store/useNotifications";
import { useNavigate } from "react-router-dom";

export const useCustomForm = (
  api_function: (data?: any) => any,
  post_success_function: (data: Usuario) => void,
  route: string
) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const { setNotifications } = useNotifications();

  const onSubmit = async (data: any) => {
    try {
      setIsloading(true);
      const res = await api_function(data);

      post_success_function(res);
      navigate(route);

      setIsloading(false);
      reset();
      return res;
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

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    isLoading,
    reset,
    setValue,
  };
};
