import { ModalTemplate } from "../../ModalTemplate";
import { ReadyToJoin } from "../../../layouts/ServerLayout/Components/Channel/Components/ReadyToJoin";

export const ChannelVideocallsModal = () => {
  return (
    <ModalTemplate identificator={"JoinVideoCall"}>
      <ReadyToJoin />
    </ModalTemplate>
  );
};
