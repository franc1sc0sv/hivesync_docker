import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_RESPONSE_ERROR_CLASS } from "../class/api_responses_instances";
import { useNotifications } from "../store/useNotifications";
import { useModal } from "../store/useModal";
import { useNavigate } from "react-router-dom";

export const useCustomFormCreateServer = (
  api_function: (data?: any) => any
) => {
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setIsloading] = useState(false);
  const { setNotifications } = useNotifications();
  const { setModalId } = useModal();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setIsloading(true);
      const res = await api_function(data);
      navigate(res.url);
      setIsloading(false);
      setModalId("");
      return res;
    } catch (e: any) {
      if (e.message) {
        setNotifications(e);
        setIsloading(false);
        return;
      }

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

  return { onSubmit: handleSubmit(onSubmit), register, isLoading, setValue };
};
