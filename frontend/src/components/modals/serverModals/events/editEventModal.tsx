import { ModalTemplate } from "../../ModalTemplate";
import { CalendarIcon } from "../../../Icons/calendar";
import { useState, useEffect } from "react";
import { useEventsList } from "./context/eventsContext";
import { edit_event, get_event_by_server } from "../../../../api/events";
import { useCustomFormModal } from "../../../../hooks/useFormModal";
import { InputsForms } from "../../../forms/Inputs/inputs";
import { SubmitButton } from "../../../forms/Inputs/Button";
import { TextArea } from "../../../forms/Inputs/TextArea";
import { DateInput } from "../../../forms/Inputs/datePicker";

interface Props {
    serverId: string;
    eventId: string;
}

interface EventInfoProps {
    id: string;
    name: string;
    description: string;
    date: string;
}

export const EditEventModal: React.FC<Props> = ({ serverId }) => {
    const { eventId } = useEventsList();

    return (
        <ModalTemplate identificator="editEvent">
            <EditEventForm serverId={serverId} eventId={eventId} />
        </ModalTemplate>
    );
};

const EditEventForm: React.FC<Props> = ({ serverId, eventId }) => {

    const [eventData, setEventData] = useState<EventInfoProps>();

    useEffect(() => {
        const fetch = async () => {
            const event = await get_event_by_server(serverId, {
                data: eventId,
            });
            setEventData(event);
        };
        fetch();
    }, [serverId, eventId]);

    const api_function = (data: any) => {
        edit_event(serverId, data);
    };

    const { onSubmit, register, isLoading } = useCustomFormModal((data) => {
        const formData = {
            ...data,
            eventId: eventId, 
        };
        api_function(formData);
    });
    
    return (
        <div className="h-full flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-row gap-5 justify-center items-center">
                <CalendarIcon size={40} color="white" />
                <p className="text-2xl text-custom_white text-center">Editar información de evento</p>
            </div>

            <form
                onSubmit={onSubmit}
                className="w-full flex flex-col justify-center items-center gap-5 overflow-y-auto px-1"
            >

                <div className="w-[320px]">
                    <InputsForms
                        inputValue={eventData?.name}
                        title="Tema del evento"
                        register={register}
                        name="name"
                        placeholder="¿De qué trata tu evento?"
                    />
                </div>

                <TextArea
                    inputValue={eventData?.description}
                    title="Descripción del evento"
                    placeholder="Cuéntales a los miembros del servidor de qué trata el evento."
                    name="description"
                    register={register}
                />

                <div className="w-full">
                    <DateInput
                        defaultValue={eventData?.date ? new Date(eventData.date) : undefined}
                        title="Fecha del evento"
                        placeholder="Selecciona la fecha de tu evento"
                        name="date"
                        register={register}
                    />
                </div>

                <div className="w-[320px]">
                    <SubmitButton text="Guardar " isLoading={isLoading} />
                </div>
            </form>
        </div>
    );
};

