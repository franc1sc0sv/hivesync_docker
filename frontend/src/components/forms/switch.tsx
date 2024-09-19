import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
    name: string;
    register: UseFormRegister<FieldValues>;
    onClick: () => void;
    isChecked?: boolean; // Prop opcional para controlar si el switch está chequeado inicialmente
}

export const ToggleSwitch: React.FC<Props> = ({ onClick, register, name, isChecked }) => {
    return (
        <label
            className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isChecked} // Vinculando la prop isChecked al atributo checked
                {...register(name)}
                onClick={onClick}
            />
            <div className="relative w-14 h-8 bg-gray peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
        </label>
    );
}
