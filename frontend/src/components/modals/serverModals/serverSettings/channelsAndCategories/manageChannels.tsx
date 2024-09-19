import { useModal } from "../../../../../store/useModal"
import { ModalTemplate } from "../../../ModalTemplate"
import { CategoryIcon } from "../../../../Icons/category"

interface CategoriesProps {
    name: string
}

interface CategoriesListProps {
    category: CategoriesProps[]
}

const categories: CategoriesProps[] = [
    {
        name: "a"
    }
]

export const ManageCategories: React.FC = () => {
    return (
        <ModalTemplate identificator="manageChannels">
            <div className="flex flex-col gap-5">
                <Header />
                <CategoriesList category={categories} />
            </div>
        </ModalTemplate>
    )
}

const Header: React.FC = () => {

    const { setModalId } = useModal();

    return (
        <div className="flex flex-row items-center justify-center w-full">
            <button
                onClick={() => setModalId("CreateCategory")}
                className="flex gap-3">
                <CategoryIcon size={40} color="#fff" />
                <p className="text-2xl text-custom_white">Agregar categoría</p>
            </button>
        </div>
    )
}

const CategoriesList: React.FC<CategoriesListProps> = ({ category }) => {
    return (
        <div className="flex flex-col gap-3 p-3 bg-overlay_2 rounded-xl">
            {category.map((option: any, index: number) => (
                <div
                    className="flex flex-row items-center gap-3"
                    key={index}
                >
                    <div>
                        <div className="w-8 h-8 p-3 rounded-full bg-light_purple">
                        </div>
                    </div>
                    <p className="text-custom_white">{option.name}</p>
                </div>
            ))}
        </div>
    )
}