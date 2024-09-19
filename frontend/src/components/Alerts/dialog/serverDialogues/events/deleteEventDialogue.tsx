import { DialogueTemplate } from "../../dialogueModalTemplate"
import { CustomizedButton } from "../../../../buttons/customizedButton";
import { CheckIcon } from "../../../../Icons/check";
import { useModal } from "../../../../../store/useModal";
import { useDialogue } from "../../../../../store/useDialogue";
import { useEffect } from "react";

export const DeleteEventDialogue: React.FC = () => {
    return (
        <DialogueTemplate identificator="deleteEvent">
            <Dialogue />
        </DialogueTemplate>
    )
}

const Dialogue: React.FC = () => {
    const { setModalId } = useModal();
    const { setDialogueState } = useDialogue(); 

    const accept = () => {
        setDialogueState(true);
    };

    const decline = () => {
        setDialogueState(false);
        setModalId("");
    };

    return (
        <div className="flex flex-col w-full h-full gap-5 p-3">
            <div className="flex flex-col items-center justify-start w-full gap-3">
                <CheckIcon size={50} color="white" />
                <p className="text-2xl text-center text-custom_white">
                    ¿Estás seguro que quieres finalizar la tarea?
                </p>
            </div>
            <div className="flex flex-row justify-between w-full gap-5">
                <CustomizedButton
                    text="Confirmar"
                    color="#9333ea"
                    displayIcon={false}
                    onAction={accept} 
                />
                <CustomizedButton
                    text="Cancelar"
                    color="#382C6C"
                    displayIcon={false}
                    onAction={decline}
                />
            </div>
        </div>
    );
};






