import { useSingleImage } from "../../../../../../store/useSingleImage";
import { convertArrayToFileList } from "../../../../../../helpers/convertArrayToFileList";
import { useEffect } from "react";
import { SlPicture } from "react-icons/sl";

const SingleImageDrop = ({ id = "image" }) => {
    const { imagen, setImagen, setData } = useSingleImage();

    const agregarImagen = (e: any) => {
        setImagen([{ ...e.target.files }[0]]);
    };

    const dropImagen = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        setImagen([{ ...e.dataTransfer.files }[0]]);
    };

    const dragOver = (e: any) => {
        e.preventDefault();
    };

    useEffect(() => {
        setData(convertArrayToFileList(imagen));
    }, [imagen]);

    return (
        <div className="flex flex-col w-full gap-3">
            <p className="select-none text-custom_white">Sube o arrastra una imagen</p>
            <label
                onDrop={dropImagen}
                onDragOver={dragOver}
                className="border-[3px] cursor-pointer hover:bg-gray-100 transition-all py-20 border-custom_white rounded-lg border-dashed"
                htmlFor={id}
            >
                <SlPicture color="#fff" size={60} className="mx-auto" />
            </label>
            <input onChange={agregarImagen} id={id} type="file" hidden />
        </div>
    );
};

export default SingleImageDrop;
