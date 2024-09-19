import { ServersGroupIcon } from "../../../Icons/server";

export const NoServers = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full h-[95vh] gap-6 p-4 bg-overlay_2 rounded-overlay ">
      <div className="flex flex-col gap-10 justify-center items-center">

        <div className="flex flex-col items-center rounded-lg justify-evenly gap-5 p-4">
          <ServersGroupIcon size={60} color="#fff" />
          <h1 className="text-3xl text-custom_white font-almarai text-center">
            Parece que estás navegando solo por ahora.
          </h1>
          <p className="text-xl text-center text-custom_white">
            ¡Busca servidores o comunidades interesantes y únete a ellos!
          </p>
        </div>
      </div>
    </section>
  );
};
