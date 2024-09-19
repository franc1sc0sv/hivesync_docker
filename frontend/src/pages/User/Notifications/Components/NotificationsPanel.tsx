import { ComponentsAnimator } from "../../../../components/animation/componentsAnimator";
import { UserAvatar } from "../../../../components/Avatars/UserAvatar";

import { BellIcon } from "../../../../components/Icons/bell";
import { formatTimeDifference } from "../../../../helpers/date";
import { useAddFriendsData } from "../../../../store/useAddFriendsData";
import { useAddMembers } from "../../../../store/useAddMembers";
import { useModal } from "../../../../store/useModal";
import { useNotificationsContext } from "../context/useNotifications";
import { NotificationProps } from "../types/NotificationProps";

export const NotificationsPanel = () => {
  return (
    <section className="flex flex-col w-full h-full gap-5 overflow-y-auto bg-gray-800 rounded-lg shadow-lg">
      <CategoriesHeader />
      <NotificationsBox />
    </section>
  );
};

const NotificationsBox = () => {
  const { category, notifications } = useNotificationsContext();

  const filteres_notifications =
    category === "all"
      ? [...notifications]
      : notifications.filter((noti) => noti.category === category);
  console.log();

  return filteres_notifications.length === 0 ? (
    <NoNotifications />
  ) : (
    <>
      <NotificationsContainer filtered_notifications={filteres_notifications} />
    </>
  );
};

const NotificationsContainer = ({
  filtered_notifications,
}: {
  filtered_notifications: NotificationProps[];
}) => {
  return (
    <article className="flex flex-col w-full h-full overflow-y-auto">
      {filtered_notifications?.map((noti, i) => (
        <NotificationItem key={i} notification={noti} i={i} />
      ))}
    </article>
  );
};

const NotificationItem = ({
  notification,
  i,
}: {
  notification: NotificationProps;
  i: number;
}) => {
  const { setModalId } = useModal();
  const { setFriendsData } = useAddFriendsData();
  const { setMemberData } = useAddMembers();

  const handleClick = () => {
    if (!notification.data?.id_request) return;
    if (notification.category === "request") {
      const data = { id_notification: notification.id, ...notification.data };
      setFriendsData(data);
      setModalId("AddFriendModal");
    }

    if (notification.category === "invitation") {
      const data = { id_notification: notification.id, ...notification.data };
      setMemberData(data);
      setModalId("NotifiactionMemberModal");
    }
  };

  return (
    <ComponentsAnimator key={i}>
      <div
        onClick={handleClick}
        className="flex items-center w-full gap-4 p-3 border-b-0"
      >
        <div className="w-max">
          <UserAvatar
            fontSize={2}
            h={4}
            w={4}
            profileURl={notification.data.user.profileUrl}
            username={notification.data.user.username}
          />
        </div>

        <div className="flex flex-col w-full">
          <p className="text-sm font-light text-white font-amiko">
            {notification.message}
          </p>
          <span className="self-end text-sm text-gray">
            {formatTimeDifference(notification.createdAt)}
          </span>
        </div>
      </div>
    </ComponentsAnimator>
  );
};

const CategoriesHeader = () => {
  const {
    category: selectedCategory,
    handleCategoryClick,
    categories,
  } = useNotificationsContext();
  return (
    <div className="flex gap-4 overflow-x-auto">
      {categories.map((category, i) => (
        <button
          key={i}
          onClick={() => handleCategoryClick(category.id)}
          className={`py-2 px-4 rounded-full capitalize ${
            selectedCategory === category.id
              ? "bg-purple-600 text-white"
              : "bg-transparent text-white transition-all duration-300"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

const NoNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5 sm:flex-row">
      <BellIcon size={60} color="white" />
      <h2 className="text-2xl text-center text-custom_white">
        No tienes notificaciones por el momento.
      </h2>
    </div>
  );
};
