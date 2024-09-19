import { ModalTemplate } from "../../ModalTemplate";

export const LeaveServerModal: React.FC = () => {
    return (
        <ModalTemplate identificator="leaveServer">
            <Leave />
        </ModalTemplate>
    )
}

const Leave: React.FC = () => {
    return (
        <p className="text-2xl text-custom_white text-center">Abandonar servidor</p>
    )
}