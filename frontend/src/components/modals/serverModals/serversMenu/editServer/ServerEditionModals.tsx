import { EditServerModal } from "./EditInformation"
import { EditCoverModal } from "./EditServerCover"
import { EditServerPicture } from "./EditServerPicture"
import { EditServerNameModal } from "../../serverSettings/general/editServerName"

export const ServerEditionModals: React.FC = () => {
    return (
        <>
            <EditServerModal />
            <EditCoverModal />
            <EditServerPicture />
        </>
    )
}