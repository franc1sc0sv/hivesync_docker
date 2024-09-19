import { ModalTemplate } from "../../ModalTemplate";

export const InviteByLinkModal: React.FC = () => {
    return (
        <ModalTemplate identificator="inviteByLink">
            <InviteByLink />
        </ModalTemplate>
    );
}

const InviteByLink: React.FC = () => {
    return (
        <section className="flex flex-col justify-center items-center w-full h-full gap-5">
            <p className="text-2xl text-custom_white">*Invita por link épicamente*</p>
            <p className="text-md text-custom_white">Aún no tengo diseño de esto xd</p>
        </section>
    );
};
