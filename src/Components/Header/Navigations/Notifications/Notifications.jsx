import { IoMdNotificationsOutline } from "react-icons/io";

export const Notifications = () => {
  return (
    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full transition-all hover:bg-pink-200">
      <IoMdNotificationsOutline
        className="text-primary-700 dark:text-primary_dark-700 cursor-pointer p-1"
        size={30}
      />
    </div>
  );
};
