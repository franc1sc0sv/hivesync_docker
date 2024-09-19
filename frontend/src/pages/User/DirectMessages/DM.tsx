import { GeneralLayout } from "../../../components/layouts/GeneralLayout/GeneralLayout";

import { AddFriendsButton } from "../../../components/buttons/AddFriendsButton";

import { Inbox } from "./Components/Inbox";

import { ShowFakePages } from "../../../components/fakePages/ShowFakePages";

import { DmProvider } from "./Context/ContextDM";

export const DirectMessagesPage = () => {


  return (
    <GeneralLayout title="Mensajes" RightComponent={AddFriendsButton}>
      <DmProvider>
        <article className="flex flex-col w-full h-full">
          <Inbox />
        </article>
        <ShowFakePages />
      </DmProvider>
    </GeneralLayout>
  );
};
