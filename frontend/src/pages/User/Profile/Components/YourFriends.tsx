const temporaryRoute =
    "https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg";

export const MyFriends: React.FC = () => {
    return (
        <div className="flex flex-row items-center justify-between p-3 rounded-lg bg-overlay_2">
            <h1 className="text-custom_white">Tus amigos</h1>

            <div className="flex -space-x-4 rtl:space-x-reverse">
                <img
                    className="object-cover object-center w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                    src={temporaryRoute}
                    alt="Friend Profile picture"
                />
                <img
                    className="object-cover object-center w-10 h-10 border-2 border-white rounded-full dark:border-gray-"
                    src={temporaryRoute}
                    alt="Friend Profile picture"
                />
                <img
                    className="object-cover object-center w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                    src={temporaryRoute}
                    alt="Friend Profile picture"
                />
                <img
                    className="object-cover object-center w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                    src={temporaryRoute}
                    alt="Friend Profile picture"
                />
            </div>
        </div>
    );
}