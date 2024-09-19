import { FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
    title?: string,
    placeholder: string,
    name: string,
    register: UseFormRegister<FieldValues>,
    inputValue?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({title, placeholder, register, name, inputValue}) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <p className="text-lg font-bold text-custom_white font-almarai ">
                {title}
            </p>

            <textarea 
            {...register(name)}
            rows={4} 
            cols={40} 
            placeholder={placeholder}
            defaultValue={inputValue}
             className="p-2 resize-none text-custom_white placeholder-gray bg-overlay_2 rounded-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-primary focus:border-primary" />

        </div>
    )
}