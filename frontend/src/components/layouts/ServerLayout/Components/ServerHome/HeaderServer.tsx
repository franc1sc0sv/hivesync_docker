import { CalendarIcon } from "../../../../Icons/calendar";
import { RightTriangleIcon } from "../../../../Icons/rightTriangle";
import { UsersGroupIcon } from "../../../../Icons/usersGroup";

import { useEventsList } from "../../../../modals/serverModals/events/context/eventsContext";

import { useModal } from "../../../../../store/useModal";
import { useServer } from "../../hooks/useServer";
import { useSession } from "../../../../../store/user";

export const HeaderServer = ({ name }: { name: string }) => {
  const { setModalId } = useModal();
  const { fetchEvents } = useEventsList();
  const {
    selected_server: { id_user },
  } = useServer();

  const { user } = useSession();

  const isAdminServer = id_user === user?.id;

  const handleEvents = () => {
    fetchEvents();
    setModalId("events");
  };

  const hanfleOpenConfig = () => {
    if (!isAdminServer) return;
    setModalId("serverInfo");
  };

  return (
    <article className="flex flex-col gap-3 ">
      <div className="flex items-center gap-2 w-fit" onClick={hanfleOpenConfig}>
        <p className="text-2xl font-bold text-custom_white font-almarai ">
          {name}
        </p>
        {isAdminServer && <RightTriangleIcon size={20} color="white" />}
      </div>

      <div className="flex gap-2">
        <button
          className="flex items-center justify-center w-12 h-12 p-2 rounded-full bg-overlay_1"
          onClick={() => setModalId("membersList")}
        >
          <UsersGroupIcon size={24} color="white" />
        </button>

        <button
          className="flex items-center justify-center w-12 h-12 p-2 rounded-full bg-overlay_1"
          onClick={handleEvents}
        >
          <CalendarIcon size={24} color="white" />
        </button>
      </div>
    </article>
  );
};
