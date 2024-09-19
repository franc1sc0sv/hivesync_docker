import { ModalTemplate } from "../../../ModalTemplate";
import { useCustomForm } from "../../../../../hooks/useForm";
import { ToggleSwitch } from "../../../../forms/switch";
import React, { useState } from "react";

export const EditTransitionModal: React.FC = () => {
    return (
        <ModalTemplate identificator="editTransition">
            <div className="flex items-center justify-center h-full">
                <ToggleTransitionForm />
                {/* <TransitionToggle /> */}
            </div>
        </ModalTemplate>
    );
}

export const ToggleTransitionForm = () => {
    const [isChecked, setIsChecked] = useState<boolean>(() => {
        // Inicializar el estado del toggle desde localStorage, si existe
        const storedValue = localStorage.getItem("transitionState");
        return storedValue ? JSON.parse(storedValue) : false;
    });

    const toggleTransition = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);

        console.log(newCheckedState);
        localStorage.setItem("transitionState", JSON.stringify(newCheckedState));

        // Opcional: Recargar la página para aplicar cambios
        location.reload();
    }

    const api = () => console.log("hola, *llama a la api épicamente*");
    const success = () => console.log("success");

    const { register } = useCustomForm(api, success, "");


    return (
        <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-5 bg-overlay_2 rounded-xl p-5 md:p-8 lg:p-10">
            <p className="text-lg md:text-2xl text-custom_white text-center">
                Activa o desactiva la transición entre páginas
            </p>
            <div className="w-full flex flex-row md:flex-row justify-evenly items-center gap-4">
                <p className="text-md md:text-xl lg:text-2xl text-light_purple text-center">
                    {isChecked ? "La transición está activa" : "La transición está desactivada"}
                </p>
                <ToggleSwitch
                    name="transition"
                    register={register}
                    onClick={toggleTransition}
                    isChecked={isChecked} // Pasar el estado inicial al switch
                />
            </div>
        </div>
    );
}



