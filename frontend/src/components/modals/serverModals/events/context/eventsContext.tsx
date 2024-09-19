import { useContext, createContext, useState, useEffect } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import { useServer } from "../../../../layouts/ServerLayout/hooks/useServer";
import { LoadingPage } from "../../../../routes/loadingPage";
import { get_all_events_by_server } from "../../../../../api/events";
import { useModal } from "../../../../../store/useModal";

interface EventsProps {
    serverId: string;
    id: string;
    name: string;
    description: string;
    date: string;
}

interface EventContextType {
    events: EventsProps[];
    eventId: string;
    setSelectedEventId: React.Dispatch<React.SetStateAction<string>>;
    fetchEvents: () => Promise<void>;
    isLoading: boolean;
}

const EventContext = createContext<EventContextType | null>({
    events: [],
    eventId: '',
    setSelectedEventId: () => { },
    fetchEvents: async () => { },
    isLoading: false,
});

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
    const { selected_server } = useServer();
    const [eventId, setSelectedEventId] = useState<string>("");
    const { modalId } = useModal();
    const { isLoading, fecthData } = useFetch({
        api_function: () => get_all_events_by_server(selected_server.id),
    });

    const [events, setEvents] = useState<EventsProps[]>([]);

    const fetchEvents = async () => {
        try {
            const eventsList = await fecthData();

            const validEventsList = Array.isArray(eventsList) ? eventsList : [];

            const transformedEvents = validEventsList.map((event: EventsProps) => ({
                ...event,
                eventDate: event?.date?.split("T")[0] || "Invalid date",
            }));

            setEvents(transformedEvents);
        } catch (error) {
            console.error("Error fetching events", error);
            setEvents([]);
        }
    };

    useEffect(() => {
        if (modalId === "events") {
            fetchEvents();
        }
    }, [modalId]);

    if (isLoading) {
        console.log("events loading")
    }

    return (
        <EventContext.Provider value={{ events, isLoading, eventId, setSelectedEventId, fetchEvents }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEventsList = () => {
    const context = useContext(EventContext);

    if (!context) {
        throw new Error("useEventsList must be used within an EventsProvider");
    }

    return context;
};
