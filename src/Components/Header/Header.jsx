import { Searchbar } from "./SearchBar";
import { Navigations } from "./Navigations";

export const Header = () => {
  return (
    <div className="h-14 w-full z-[1] fixed top-0 left-0 transition-colors bg-white dark:bg-[#1e293b] shadow-md shadow-[#b87fa2] dark:shadow-[#293548]">
      <div className="w-full md:max-w-3xl lg:max-w-4xl md:m-auto h-full flex justify-between">
        <Searchbar />
        <Navigations />
      </div>
    </div>
  );
};
