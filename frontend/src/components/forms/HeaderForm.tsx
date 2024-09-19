import { Link } from "react-router-dom"

export const HeaderForm = () => {
    return (
        <div>
            <Link to={"/"}>
                <img className="flex h-12 p-1" src="/logo.png"></img>
            </Link>
            <div className="h-4 bg-primary w-20  rounded-lg mx-auto my-5"></div>
        </div>
    )
}