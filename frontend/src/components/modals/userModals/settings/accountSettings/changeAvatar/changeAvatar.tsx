import { ModalTemplate } from "../../../../ModalTemplate";

import { useEffect, useRef, useState } from "react";
import { convertArrayToFileList } from "../../../../../../helpers/convertArrayToFileList";
import { useSingleImage } from "../../../../../../store/useSingleImage";
import { useNavigate } from "react-router-dom";

import AvatarEditor from "react-avatar-editor";

import { motion } from "framer-motion";

import Range from "../../../../../forms/Inputs/range";
import { CustomizedButton } from "../../../../../buttons/customizedButton";

import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import SingleImageDrop from "./singleImageDrop";

export const ChangeAvatar = () => {
    const { data, setImagen, setData } = useSingleImage();

    const [imageURL, setImageURL] = useState(null);
    const [cropedImage, setCropedImage] = useState(null);
    const [zoom, setZoom] = useState(2.5);
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();
    const zoomMinmax = [1, 5];

    const resetForm = () => {
        setImageURL(null);
        setImagen([]);
        setData([]);
    };

    const succesSubmitAvatar = async (imageBlob: any) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append(
                "avatar",
                imageBlob,
                `avatar_${name.split(" ").join("")}.png`
            );

            const avatar = convertArrayToFileList(formData.getAll("avatar"));
            const mappeData = { avatar: { ...avatar }[0] };

            // const status = await actualizarAvatar(mappeData);

            if (status) {
                resetForm();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data.length !== 0) {
            const imageUrl = URL.createObjectURL(data[0]);
            setImageURL(imageUrl);
        }
    }, [data]);

    useEffect(() => {
        if (zoom >= zoomMinmax[1]) {
            setZoom(5);
            return;
        }

        if (zoom <= zoomMinmax[0]) {
            setZoom(1);
            return;
        }
    }, [zoom]);

    return (
        <div className="w-full lg:w-1/2 mx-auto flex flex-col gap-5 p-4">
            <h2 className="text-custom_white text-2xl text-center">
                {!imageURL ? "Cambiar avatar" : "Ajustar imagen"}
            </h2>

            {!imageURL && <ImageDrop />}

            {imageURL && (
                <AjustarImagen
                    minmax={zoomMinmax}
                    step={0.1}
                    setValue={setZoom}
                    value={zoom}
                    image={imageURL}
                    handleClickReset={resetForm}
                    setCropedImage={setCropedImage}
                    cropedImage={cropedImage}
                    isLoading={isLoading}
                    succesSubmitAvatar={succesSubmitAvatar}
                />
            )}
        </div>
    );
};


const ImageDrop = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <SingleImageDrop />
        </motion.div>
    );
};


const AjustarImagen = ({
    image,
    minmax,
    step,
    setValue,
    value,
    handleClickReset,
    setCropedImage,
    succesSubmitAvatar,
    isLoading,
}: any) => {

    const editor = useRef();
    const handleClickGuardar = () => {
        if (editor.current) {
            const canvas = editor.current.getImage();
            canvas.toBlob((blob: any) => {
                succesSubmitAvatar(blob);
            });
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-3 rounded-2x"
        >
            <AvatarEditor
                ref={editor}
                image={image}
                width={150}
                height={150}
                scale={value}
                borderRadius={15}
            />



            <Zoom minmax={minmax} step={step} setValue={setValue} value={value} />
            <div className="flex justify-center items-center gap-4">

                <CustomizedButton
                    text="Cancelar"
                    displayIcon={false}
                    color="#45156B"
                    onAction={handleClickReset}
                />

                <CustomizedButton
                    text="Guardar"
                    displayIcon={false}
                    color="#9333EA"
                    onAction={() => { }}
                />
            </div>
        </motion.div>
    );
};

const Zoom = ({ minmax, step, setValue, value, t }: any) => {
    const handleClickPlus = () => {
        if (value + 0.25 >= minmax[1]) {
            setValue(5);
            return;
        }
        setValue(value + 0.25);
    };
    const handleClickMinus = () => {
        if (value - 0.25 <= minmax[0]) {
            setValue(1);
            return;
        }
        setValue(value + 0.25);
        setValue(value - 0.25);
    };
    return (
        <div className="flex items-center justify-center w-full gap-3">
            <AiOutlineMinus
                color="#fff"
                onClick={handleClickMinus}
                className="cursor-pointer"
                size={30}
            />
            <Range
                color="#000"
                minmax={minmax}
                step={step}
                setValue={setValue}
                value={value}
            />
            <AiOutlinePlus
                color="#fff"
                onClick={handleClickPlus}
                className="cursor-pointer"
                size={30}
            />
        </div>
    );
};



export const ChangeAvatarModal: React.FC = () => {
    return (
        <ModalTemplate identificator="changeAvatar">
            <ChangeAvatar />
        </ModalTemplate>
    )
}