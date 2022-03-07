import { Searchbar } from "./SearchBar";
import { Navigations } from "./Navigations";

export const Header = () => {
  return (
    <div className="h-14 w-full z-[1] fixed top-0 left-0 border-0 border-b-[1px] bg-white border-primary-700 shadow-md shadow-[#b87fa2]">
      <div className="w-full max-w-6xl m-auto h-full flex justify-between">
        <Searchbar />
        <Navigations />
      </div>
    </div>
  );
};
