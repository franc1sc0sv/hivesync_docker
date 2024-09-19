import { IoIosArrowForward } from "react-icons/io";
import { ItemAcordeonChannel } from "./Item";
import { useChannelList } from "../../../hooks/useChannelList";
import { ChannelsFormated } from "../../../types/server";

export const AcordeonMenu = ({
  CategoryChannel,
}: {
  CategoryChannel: ServerChannels;
}) => {
  return (
    <section className="flex flex-col gap-3">
      <CategoryChannels
        category={CategoryChannel.category}
        isActive={CategoryChannel.isCategoryActive}
      />

      <AcordeonItems
        isCategoryOpen={CategoryChannel.isCategoryActive}
        CategoryChannel={CategoryChannel.channels}
      />
    </section>
  );
};

const CategoryChannels = ({
  category,
  isActive,
}: {
  category: string;
  isActive: boolean;
}) => {
  const { toogleCategory } = useChannelList();

  const handleClick = () => {
    toogleCategory(category);
  };

  const roatateStyle = isActive && "rotate-90 ";

  return (
    <div
      className="flex items-center gap-2 font-medium text-custom_white font-almarai"
      onClick={handleClick}
    >
      <IoIosArrowForward
        className={` transition-all ${roatateStyle}`}
        size={20}
      />
      <p>{category}</p>
    </div>
  );
};

export const AcordeonItems = ({
  CategoryChannel,
  isCategoryOpen,
}: {
  CategoryChannel: ChannelsFormated[];
  isCategoryOpen?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      {CategoryChannel.map((channel) => (
        <ItemAcordeonChannel
          isCategoryOpen={isCategoryOpen}
          channel={channel}
          key={channel.id}
        />
      ))}
    </div>
  );
};
