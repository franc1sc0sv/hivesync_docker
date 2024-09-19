import { RiArrowRightSLine } from "react-icons/ri";

interface PurpleInputProp {
    text: string;
    onAction: ()=> void 
}

export const PurpleButton: React.FC<PurpleInputProp> = ({
    text,
    onAction
}) => {
    return (
        <div
            onClick={onAction}
            className={"flex items-center h-14 w-full p-3 font-bold bg-primary rounded-xl text-custom_white font-almarai "}
        >
            <div className="flex justify-between w-full flex-row">
                <p>{text}</p>   
                <RiArrowRightSLine size={28}/>
            </div>
        </div>
    );
};
