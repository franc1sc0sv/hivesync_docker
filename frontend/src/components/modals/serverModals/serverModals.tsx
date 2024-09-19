// import { ServerInfoModal } from "./serverInfoModal"

// import { MembersListModal } from "./members/membersListModal"
// import { AddServerMembersModal } from "./members/addServerMemberModal"

// import { EventsModal } from "./events/eventsModal"

// import { CreateCategory } from "./serversMenu/CreateCategory"
// import { CreateChannel } from "./serversMenu/CreateChannel"

// import { SettingsMenuModal } from "./serverSettings/serverSettingsMenu"
// import { ServerSettingsModals } from "./serverSettings/serverSettingsModals"

// import { LeaveServerDialogue } from "../../Alerts/dialog/serverDialogues/leaveServerDialogue"

// import { ServerEditionModals } from "./serversMenu/editServer/ServerEditionModals"

import { ServerInfoModal } from "./serverInfoModal";

import { MembersListModal } from "./members/membersListModal";
import { AddServerMembersModal } from "./members/addServerMemberModal";

import { EventsModal } from "./events/eventsModal";

import { CreateCategory } from "./serversMenu/CreateCategory";
import { CreateChannel } from "./serversMenu/CreateChannel";

import { SettingsMenuModal } from "./serverSettings/serverSettingsMenu";
import { ServerSettingsModals } from "./serverSettings/serverSettingsModals";

import { DeleteServerDialogue } from "../../Alerts/dialog/serverDialogues/deleteServer";

import { ServerEditionModals } from "./serversMenu/editServer/ServerEditionModals";
import { EditCategories } from "./serverSettings/channelsAndCategories/EditCategories";
import { DeleteCategoriesModal } from "./serverSettings/channelsAndCategories/DeleteCategories";

export const ServerModals: React.FC = () => {
  return (
    <>
      <EditCategories />
      <DeleteCategoriesModal />

      <ServerInfoModal />

      <ServerEditionModals />

      <MembersListModal />
      <AddServerMembersModal />

      <EventsModal />

      <CreateCategory />
      <CreateChannel />

      <SettingsMenuModal />
      <ServerSettingsModals />

      <DeleteServerDialogue />
    </>
  );
};
