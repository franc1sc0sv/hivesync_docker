import { FaSpotify } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


interface ConnectionsProps {
    spotifyUsername?: string
    spotifyLinked: boolean,
    githubLinked: boolean,
    githubUsername?: string
}

export const ProfileConnections: React.FC<ConnectionsProps> = ({ spotifyUsername, spotifyLinked, githubLinked, githubUsername }) => {
    return (
        <>
            <div className="flex flex-col bg-overlay_2 rounded-lg p-3 gap-3 ">

                <h1 className="text-custom_white text-lg">Conexiones</h1>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3  text-custom_white">
                        <FaSpotify className={`${spotifyLinked ? 'text-custom_white text-2xl' : 'hidden'}`} />
                        <p className={`${spotifyLinked ? 'text-custom_white text-base' : 'hidden'}`}> {spotifyUsername}</p>
                    </div>

                    <div className="flex gap-3  text-custom_white">
                        <FaGithub className={`${githubLinked ? 'text-custom_white text-2xl' : 'hidden'}`} />
                        <p className={`${githubLinked ? 'text-custom_white text-base' : 'hidden'}`}> {githubUsername}</p>
                    </div>
                </div>
            </div>
        </>
    );
}