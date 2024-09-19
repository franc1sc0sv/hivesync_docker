import { EditServerNameModal } from "./general/editServerName"
import { ServerAppearanceSettingsModal } from "./appearance/serverAppearanceSettings"
import { ChannelsAndCategoriesSettings } from "./channelsAndCategories/channelsAndCategoriesSettings"

export const ServerSettingsModals: React.FC = () => {
    return (
        <> 
            <EditServerNameModal />
            <ServerAppearanceSettingsModal />
            <ChannelsAndCategoriesSettings />
        </>
    )
}