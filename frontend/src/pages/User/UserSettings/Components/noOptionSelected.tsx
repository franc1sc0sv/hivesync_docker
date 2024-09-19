import { SettingsIcon } from "../../../../components/Icons/settings"

export const NoOptionSelected: React.FC = () => {
    return (
      <div className="w-full h-full flex justify-center items-center flex-col gap-10">
        <SettingsIcon size={60} color="#fff" />
        <p className="text-2xl text-center text-custom_white">
          Selecciona una opción para comenzar con la configuración de tu cuenta.
        </p>
      </div>
    )
  }