import { useState } from "react";
import { API_RESPONSE_ERROR_CLASS } from "../class/api_responses_instances";
import { useNotifications } from "../store/useNotifications";
import { useNavigate } from "react-router-dom";
import { useModal } from "../store/useModal";

export const useToogleAPI = ({
  api_function,
  url = "",
}: {
  api_function: (data?: any) => any;
  url?: string;
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [succes, setSucces] = useState(false);

  const { setNotifications } = useNotifications();
  const navigate = useNavigate();
  const { setModalId } = useModal();

  const onSubmit = async (data: any) => {
    try {
      setIsloading(true);
      const res = await api_function(data);
      setData(res);

      setSucces(true);
      setIsloading(false);
      setModalId("");

      if (url) {
        navigate(url);
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

      setSucces(false);
      setIsloading(false);
    }
  };

  return { onSubmit, succes, isLoading, data };
};
