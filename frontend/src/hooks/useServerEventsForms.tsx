import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_RESPONSE_ERROR_CLASS } from "../class/api_responses_instances";
import { useNotifications } from "../store/useNotifications";
import { useModal } from "../store/useModal";
import { useNavigate } from "react-router-dom";

interface FormProps {
    api_function: (data?: any) => any;
}

export const useCustomFormServerEvents = ({ api_function }: FormProps) => {

    const { register, handleSubmit, setValue } = useForm();
    const [isLoading, setIsloading] = useState(false);
    const { setNotifications } = useNotifications();
    const { setModalId } = useModal();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            setIsloading(true);
            console.log(data);
            const response = await api_function(data);
            navigate("");
            setIsloading(false);
            setModalId("");
            return response;
        } catch (error: any) {
            if (error.mesage) {
                setNotifications(error);
                setIsloading(false);
                return;
            }

            if (error instanceof API_RESPONSE_ERROR_CLASS) {
                setNotifications({
                    message: error.DATA.message,
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
    }
    return {
        onSubmit: handleSubmit((data) => onSubmit(data)),
        register,
        isLoading,
    };
}

