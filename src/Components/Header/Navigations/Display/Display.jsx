import { BsSun } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";

export const Display = () => {
  return (
    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full transition-all hover:bg-pink-200">
      <BsSun className="text-primary-700 cursor-pointer p-1" size={30} />
    </div>
  );
};
