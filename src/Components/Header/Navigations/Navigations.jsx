import { Display } from "./Display/Display";
import { Profile } from "./Profile/Profile";

export const Navigations = () => {
  return (
    <div className="h-max w-full border-0 border-t border-primary-700 sm:border-none sm:h-full fixed bottom-0 bg-white sm:relative sm:w-[15%]">
      <div className="h-full w-full flex justify-center gap-4 sm:justify-between items-center">
        <Display />
        <Profile
          style={{ width: "50px", height: "30px", cursor: "pointer" }}
          className="rounded-full transition-transform hover:scale-[.80]"
        />
      </div>
    </div>
  );
};
