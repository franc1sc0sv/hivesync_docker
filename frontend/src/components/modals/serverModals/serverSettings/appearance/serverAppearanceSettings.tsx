import { useModal } from "../../../../../store/useModal";
import { ModalTemplate } from "../../../ModalTemplate";
import { PictureIcon } from "../../../../Icons/pictureIcon";

interface MenuProps {
    icon: React.ReactNode;
    name: string;
    modal: string;
}

interface SettingsProps {
    settings: MenuProps[]
}


const options: MenuProps[] = [
    {
        icon: <PictureIcon size={30} color="white" />,
        name: "Imagen del servidor",
        modal: "",
    }
];


export const ServerAppearanceSettingsModal: React.FC = () => {
    return (
        <ModalTemplate identificator="serverAppearanceSettings">
            <Settings settings={options} />
        </ModalTemplate>
    )
}

const Settings: React.FC<SettingsProps> = ({ settings }) => {

    const { setModalId } = useModal();

    return (
        <div className="flex flex-col gap-3 p-3 bg-overlay_2 rounded-xl">
            {settings.map((option, index) => (
                <button
                    onClick={() =>
                        setModalId(option.modal)
                    }
                    className="flex flex-row items-center gap-3"
                    key={index}
                >
                    <div>
                        <div className="p-2 rounded-xl">{option.icon}</div>
                    </div>
                    <p className="text-custom_white">{option.name}</p>
                </button>
            ))}
        </div>
    )
}