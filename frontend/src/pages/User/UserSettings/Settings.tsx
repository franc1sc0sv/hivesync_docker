import { ExitIcon } from "../../../components/Icons/exit";
import { GeneralLayout } from "../../../components/layouts/GeneralLayout/GeneralLayout";
import { useSession } from "../../../store/user";
import { MenuOptions } from "./Components/OptionsMenu";
import { OptionsProvider } from "./context/optionsContext";
import { UserSettingsModals } from "../../../components/modals/userModals/settings/UserSettingsModals";
import { Notifications } from "../../../components/Alerts/Notification";

export const SettingsPage: React.FC = () => {
  const { logout } = useSession();

  return (
    <GeneralLayout title="Ajustes">
      <div className="flex flex-col max-md:justify-between h-full md:h-[85vh] gap-y-5">
        <div className="flex flex-col justify-between gap-2 overflow-y-auto">
          <OptionsProvider>
            <MenuOptions />
          </OptionsProvider>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center w-full gap-2 py-3 mx-auto text-lg bg-red-600 md:w-1/3 md:m-0 rounded-xl font-amiko text-custom_white place-items-center"
        >
          <ExitIcon size={36} color="#fff" />
          <p>Cerrar Sesión</p>
        </button>
      </div>
      <UserSettingsModals />
      <Notifications />
    </GeneralLayout>
  );
};
