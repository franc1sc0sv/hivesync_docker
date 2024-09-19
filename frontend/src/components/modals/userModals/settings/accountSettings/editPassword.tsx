import { ModalTemplate } from "../../../ModalTemplate";
import { useNotifications } from "../../../../../store/useNotifications";
import { useCustomForm } from "../../../../../hooks/useForm";
import { SubmitButton } from "../../../../forms/Inputs/Button";
import { useState } from "react";
import { PasswordInput } from "../../../../forms/Inputs/PasswordInput";

export const EditPasswordModal: React.FC = () => {
    return (
        <ModalTemplate identificator="editPassword">
            <div className="flex items-center justify-center h-full">
                <EditPasswordForm />
            </div>
        </ModalTemplate>
    );
}

export const EditPasswordForm = () => {

    const [message, setMessage] = useState("");
    const { setNotifications } = useNotifications();

    const api_function = async (data: any) => {
        const password = data.password.trim();
        const verifyPassword = data.verifyPassword.trim();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Validar campos vacíos
        if (!password || !verifyPassword) {
            setMessage("Los campos no deben quedar vacíos");
            return;
        }

        // Validar que las contraseñas coinciden
        if (password !== verifyPassword) {
            setMessage("Las contraseñas no coinciden");
            return;
        }

      // Validar la fortaleza de la contraseña
      const validatePassword = (password: string): boolean => {
        if (passwordRegex.test(password)) {
            return true;
        } else {
            setMessage("La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
            return false;
        }
    };

        if (!validatePassword(password)) {
            return;
        }

        // Guardar la contraseña y mostrar la notificación
        localStorage.setItem("password", password);
        location.reload();
    }

    const post_success_function = () => {
        setNotifications({
            message: "Los cambios han sido guardados exitosamente",
            severity: "success"
        });
    }

    const { onSubmit, register, isLoading } = useCustomForm(
        api_function,
        post_success_function,
        ``
    );

    return (
        <form
            className="w-4/5 sm:w-3/5 lg:w-1/3 flex flex-col justify-center items-center gap-10"
            onSubmit={onSubmit}
        >
            <PasswordInput name="password" register={register} />
            <PasswordInput name="verifyPassword" placeholder="Confirme su contraseña" register={register} />
            {message && (
                <p className="w-full lg:w-1/2 text-md text-center lg:text-lg text-custom_white">
                    {message}
                </p>
            )}
            
            <SubmitButton text="Guardar cambios" isLoading={isLoading} />
        </form>
    );
}
