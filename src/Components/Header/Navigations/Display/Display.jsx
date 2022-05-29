import { BsSun } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";
import { useTheme } from "../../../../Context/ThemeProvider";

export const Display = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full transition-all hover:bg-pink-200 dark:hover:bg-[#cbe0ecbf]">
      <BsSun className="text-primary-700 dark:text-[#33a5d9] cursor-pointer p-1" size={30} onClick={()=> setTheme({ type : "TOGGLE_THEME"})} />
    </div>
  );
};
