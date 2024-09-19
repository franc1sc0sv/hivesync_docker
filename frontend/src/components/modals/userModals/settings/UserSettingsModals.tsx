import { AccountSettingsModals } from "./accountSettings/modals";
import { PrivacyModals } from "./privacy/privacy";
import { VoiceModals } from "./voiceSettings/voiceModals";
import { EditAppearanceModals } from "./appearance/modals";

export const UserSettingsModals: React.FC = () => {
    return (
        <>
            <AccountSettingsModals />
            <PrivacyModals />
            <VoiceModals />
            <EditAppearanceModals />
        </>
    )

}