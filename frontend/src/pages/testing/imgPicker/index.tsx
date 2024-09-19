import React from "react"
import CambiarAvatarModal from "./imgPicker";
import { useModal } from "../../../store/useModal";
import { useEffect } from "react";

export const ChangeAvatarModal: React.FC = () => {
    const { setModalId, modalId } = useModal();

    useEffect(() => {
        console.log(modalId)
    }, [])

    return (
        <div className="w-full h-screen bg-green">
            <CambiarAvatarModal />
            <p onClick={() => setModalId("changeAvatar")}>abrir modal</p>
        </div>
    )
}