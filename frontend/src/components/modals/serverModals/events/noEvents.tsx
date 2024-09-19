import { useModal } from "../../../../store/useModal";
import { CalendarIcon } from "../../../Icons/calendar";
import { SubmitButton } from "../../../forms/Inputs/Button";

export const NoEvents: React.FC = () => {

    const { setModalId } = useModal();

    return (
        <div className="h-full flex flex-col gap-10 justify-center items-center">

            <div className="flex flex-col items-center rounded-lg  justify-evenly gap-5 p-4">
                <CalendarIcon size={60} color="white" />
                <h1 className="text-4xl text-custom_white font-almarai text-center">
                    Sin planes por ahora.
                </h1>
                <p className="sm:w-3/5 text-xl text-center text-custom_white">
                    Programa un evento para cualquier actividad planeada en tu servidor.
                </p>
            </div>

            <div className="w-full sm:w-3/5 lg:w-1/3" onClick={() => setModalId("addEvent")}>
                <SubmitButton text="Crear evento" isLoading={false} />
            </div>
        </div>


    );
};