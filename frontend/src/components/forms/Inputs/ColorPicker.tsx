import { FieldValues, UseFormRegister } from "react-hook-form";

import { ColorPaletteIcon } from "../../Icons/colorPalette";
import { useState, useEffect } from "react";

interface ColorPickerProps {
    register: UseFormRegister<FieldValues>,
    name: string,
    inputValue?: string
}


export const ColorPickerInput: React.FC<ColorPickerProps> = ({ register, name, inputValue }) => {

    const [color, setColor] = useState("#45156B");

    useEffect(() => {
        if (inputValue) {
            setColor(inputValue);
        }
    }, [inputValue])

    return (
        <div className="w-full flex  flex-col justify-center items-center gap-10">

            <label htmlFor="dropzone-file" className="flex flex-col gap-5 items-center  w-full h-64 border-4 border-custom_white border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                <div className="flex flex-col gap-5 items-center p-5">
                    <ColorPaletteIcon size={80} color="white" />

                    <div className="flex flex-row gap-5">
                        <p className="text-xl font-almarai text-gray-500 dark:text-gray-400">
                            ¡Elige un color genial!
                        </p>
                    </div>

                    <input
                        {...register(name)}
                        id="dropzone-file"
                        onChange={(e) => setColor(e.target.value)}
                        type="color"
                        value={color}
                        className="w-full" />
                </div>
            </label>

            <p className="text-custom_white text-2xl font-almarai text-center">Color seleccionado: {color}</p>
        </div>

    )
}