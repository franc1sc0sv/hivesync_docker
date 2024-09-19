import { EventsList } from "./eventsList";
import { NoEvents } from "./noEvents";
import { ModalTemplate } from "../../ModalTemplate";
import { AddEventModal } from "./addEventModal";
import { EditEventModal } from "./editEventModal";
import { useModal } from "../../../../store/useModal";
import { useServer } from "../../../layouts/ServerLayout/hooks/useServer";
import { EventsProvider, useEventsList } from "./context/eventsContext";

export const EventsModal: React.FC = () => {

    const { modalId } = useModal();
    const {selected_server} = useServer();
    const {eventId } = useEventsList();

    return (
        <div>
            <EventsProvider>
                <Events />
                {modalId === "editEvent" && <EditEventModal serverId={selected_server.id} eventId={eventId} />}
            </EventsProvider>
            <AddEventModal />
        </div>
    );
};

const Events: React.FC = () => {

    const { events } = useEventsList();

    return (
        <ModalTemplate identificator="events">
            {events?.length === 0 ? <NoEvents /> : <EventsList eventsList={events || []} />}
        </ModalTemplate>
    )
}
