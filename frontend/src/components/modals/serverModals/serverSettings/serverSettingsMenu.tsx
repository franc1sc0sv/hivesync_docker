import { ModalTemplate } from "../../ModalTemplate"
import { useModal } from "../../../../store/useModal"

// import { PencilIcon } from "../../../Icons/pencil";
// import { ColorPaletteIcon } from "../../../Icons/colorPalette";
import { DeleteIcon } from "../../../Icons/delete";
import { FolderIcon } from "../../../Icons/folder";
import { CategoryIcon } from "../../../Icons/category";

import { MenuProps, OptionsTemplateProps } from "../types/menuProps";


// const generalOptions: MenuProps[] = [
//     {
//         icon: <PencilIcon size={30} color="white" />,
//         name: "General",
//         modal: "generalSettings",
//     },
//     {
//         icon: <ColorPaletteIcon size={30} color="white" />,
//         name: "Apariencia",
//         modal: "serverAppearanceSettings",
//     },
// ];

const serverOptions: MenuProps[] = [
        {
            icon: <CategoryIcon size={30} color="white" />,
            name: "Categorías",
            modal: "manageCategories",
        }, 
        {
            icon: <FolderIcon size={30} color="white" />,
            name: "Canales",
            modal: "manageChannels",
        }
]

const advancedOptions: MenuProps[] = [
    {
        icon: <DeleteIcon size={30} color="white" />,
        name: "Eliminar servidor",
        modal: "delete_server",
    },
];

export const SettingsMenuModal = () => {
    return (
        <ModalTemplate identificator="serverSettings">
            <div className="flex flex-col w-full gap-3 mx-auto sm:w-3/5">
                {/* <p className="text-2xl text-custom_white">Ajustes generales</p>
                <Settings options={generalOptions} /> */}
                <p className="text-2xl text-custom_white">Ajustes de servidor</p>
                <Settings options={serverOptions} />
                <p className="text-2xl text-custom_white">Ajustes avanzados</p>
                <Settings options={advancedOptions} />
            </div>
        </ModalTemplate>
    )
}

const Settings: React.FC<OptionsTemplateProps> = ({ options }) => {

    const { setModalId } = useModal();

    return (
        <div>
            <div className="flex flex-col gap-3 p-3 bg-overlay_2 rounded-xl">
                {options.map((option, index) => (
                    <div
                        className="flex flex-row items-center gap-3"
                        key={index}
                        onClick={() => {
                            setModalId(option.modal);
                        }}
                    >
                        <div>
                            <div className="p-2 text-3xl text-custom_white rounded-xl">
                                {option.icon}
                            </div>
                        </div>
                        <p className="text-custom_white">{option.name}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}   