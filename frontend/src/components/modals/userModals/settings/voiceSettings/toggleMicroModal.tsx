import { ModalTemplate } from "../../../ModalTemplate";
import { useCustomForm } from "../../../../../hooks/useForm";
import { ToggleSwitch } from "../../../../forms/switch";
import useMicrophoneStore from "../../../../../store/videoCall/useMicrophoneVideocalls";


export const ToggleMicrophoneModal: React.FC = () => {
  return (
    <ModalTemplate identificator="toggleMicro">
      <div className="flex items-center justify-center h-full">
        <MicrophoneStatusForm />
      </div>
    </ModalTemplate>
  );
};

// export const MicrophoneStatusForm = () => {
//   const { isMicrophoneActive, toggleMicrophone } = useMicrophoneStore();
//   const api = () => console.log("hola, *llama a la api épicamente*");
//   const success = () => console.log("success");

//   const { register } = useCustomForm(api, success, "");

//   const handleToggle = async () => {
//     await toggleMicrophone();
//     localStorage.setItem('INITIAL_MICROPHONE_STATE', JSON.stringify(!isMicrophoneActive));
//     location.reload()
//   };

//   return (
//     <div className="w-full flex flex-col justify-center items-center gap-5">
//       <p className="text-2xl text-custom_white">Activa o desactiva el estado inicial del micrófono</p>
//       <ToggleSwitch
//         name="microphoneState"
//         register={register}
//         onClick={handleToggle}
//         isChecked={isMicrophoneActive} // Utiliza el estado desde el store
//       />
//       <p className="text-2xl text-light_purple">
//         {isMicrophoneActive ? "El micrófono está activado" : "El micrófono está desactivado"}
//       </p>
//     </div>
//   );
// };



export const MicrophoneStatusForm = () => {

  const { isMicrophoneActive, toggleMicrophone } = useMicrophoneStore();
  const api = () => console.log("hola, *llama a la api épicamente*");
  const success = () => console.log("success");

  const { register } = useCustomForm(api, success, "");

  const handleToggle = async () => {
    await toggleMicrophone();
    localStorage.setItem('INITIAL_MICROPHONE_STATE', JSON.stringify(!isMicrophoneActive));
    location.reload()
  };


  return (
    <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-5 bg-overlay_2 rounded-xl p-5 md:p-8 lg:p-10">
      <p className="text-lg md:text-2xl text-custom_white text-center">
        Activa o desactiva el estado inicial del micrófono
      </p>
      <div className="w-full flex flex-row md:flex-row justify-evenly items-center gap-4">
        <p className="text-2xl text-light_purple">
          {isMicrophoneActive ? "El micrófono está activado" : "El micrófono está desactivado"}
        </p>
        <ToggleSwitch
          name="microphoneState"
          register={register}
          onClick={handleToggle}
          isChecked={isMicrophoneActive} // Utiliza el estado desde el store
        />
      </div>
    </div>
  );
}