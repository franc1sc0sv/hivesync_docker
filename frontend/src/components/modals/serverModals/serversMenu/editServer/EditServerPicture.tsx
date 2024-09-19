import { ModalTemplate } from "../../../ModalTemplate"

export const EditServerPicture: React.FC = () => {
    return (
        <ModalTemplate identificator="editServerPicture">
            <div className="w-full h-full flex justify-center items-center">
                <p className="text-2xl text-custom_white">Aquí vamos a estrenar el img drop tomado prestado con fines educativos</p>
            </div>
        </ModalTemplate>
    )
}