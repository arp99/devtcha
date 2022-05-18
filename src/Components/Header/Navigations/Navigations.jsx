import { Messages } from "./Messages/Messages";
import { Notifications } from "./Notifications/Notifications";
import { Display } from "./Display/Display";
import { Profile } from "./Profile/Profile";

export const Navigations = () => {
  return (
    <div className="h-full w-2/5 md:w-1/5">
      <div className="h-full w-full flex justify-between items-center">
        <Messages />
        <Notifications />
        <Display />
        <Profile
          style={{ width: "50px", height: "30px", cursor: "pointer" }}
          className="rounded-full transition-transform hover:scale-[.80]"
        />
      </div>
    </div>
  );
};
