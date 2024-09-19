import { ModalTemplate } from "../../../ModalTemplate";
import { useNotifications } from "../../../../../store/useNotifications";
import { useCustomForm } from "../../../../../hooks/useForm";
import { InputsForms } from "../../../../forms/Inputs/inputs";
import { SubmitButton } from "../../../../forms/Inputs/Button";
import { useState } from "react";


export const EditMailModal: React.FC = () => {
    return (
        <ModalTemplate identificator="editMail">
            <div className="flex items-center justify-center h-full">
                <EditMailForm />
            </div>
        </ModalTemplate>
    )
}

export const EditMailForm = () => {

    const [message, setMessage] = useState("");
    const { setNotifications } = useNotifications();

    const api_function = async (data: any) => {
        const mail = data.mail;
        if (mail.trim().length === 0) {
            setMessage("Los campos no deben quedar vacíos");
            return;
        }

        // Expresión regular básica para validar correos electrónicos
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(mail)) {
            setMessage("Ingresa un correo electrónico válido");
            return;
        }

        localStorage.setItem("mail", mail);
        location.reload();
    }

    const post_success_function = () => {
        console.log("la api se llamó exitosa y épicamente");
        setNotifications({
            message: "Los cambios han sido guardados exitosamente",
            severity: "success"
        })
    }

    const { onSubmit, register, isLoading } = useCustomForm(
        api_function,
        post_success_function,
        ``
    );

    return (
        <form
            className="w-4/5 sm:w-3/5 lg:w-1/3 flex flex-col justify-center items-center gap-10"
            onSubmit={onSubmit}>
            <InputsForms
                title="Editar correo electrónico"
                name="mail"
                type="mail"
                placeholder="Escribe un correo"
                register={register}
            />
            {message !== "" && <p className="text-lg text-custom_white text-center">{message}</p>}
            <SubmitButton text="Guardar cambios" isLoading={isLoading} />
        </form>
    )
}