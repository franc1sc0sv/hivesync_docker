import React, { useState } from "react";
import { ModalTemplate } from "../../../ModalTemplate";
import { useCustomForm } from "../../../../../hooks/useForm";
import { ToggleSwitch } from "../../../../forms/switch";
import { USER_STATUS_PROFILE } from "../../../../layouts/VideocallLayout/config";


export const ToggleOnline: React.FC = () => {
  return (
    <ModalTemplate identificator="toggleOnline">
      <div className="flex items-center justify-center h-full">
        <OnlineStatusForm />
      </div>
    </ModalTemplate>
  );
};

export const OnlineStatusForm: React.FC = () => {

  const api = () => console.log("hola, *llama a la api épicamente*");
  const success = () => console.log("success");

  const { register } = useCustomForm(api, success, "");



  const [status, setStatus] = useState<string>(() => {
    // Obtén el estado inicial desde localStorage, con "desconectado" como valor por defecto
    const storedStatus = localStorage.getItem("localAppearAs");
    return storedStatus ? storedStatus : USER_STATUS_PROFILE.DISCONNECTED;
  });


  const handleToggle = () => {
    const newStatus = status === USER_STATUS_PROFILE.CONNECTED ? USER_STATUS_PROFILE.DISCONNECTED : USER_STATUS_PROFILE.CONNECTED;
    setStatus(newStatus);
    // Guarda el nuevo estado en localStorage como "conectado" o "desconectado"
    localStorage.setItem("localAppearAs", newStatus);
    location.reload(); // Recargar la página para aplicar cambios
  };


  return (
    <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-5 bg-overlay_2 rounded-xl p-5 md:p-8 lg:p-10">
      <p className="text-lg md:text-2xl text-custom_white text-center">
        Activa o desactiva tu estado en línea
      </p>
      <div className="w-full flex flex-row md:flex-row justify-evenly items-center gap-4">
        <p className="text-2xl text-light_purple">
          {status === USER_STATUS_PROFILE.CONNECTED ? "Estás en línea" : "Estás desconectado"}
        </p>
        <ToggleSwitch
          name="appearAs"
          register={register}
          onClick={handleToggle}
          isChecked={status === USER_STATUS_PROFILE.CONNECTED} // Chequear si el estado es "conectado"
        />
      </div>
    </div>
  );
}