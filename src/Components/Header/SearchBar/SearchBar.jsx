import logo from "../../../assets/logo.png";

export const Searchbar = () => {
  return (
    <div className="h-full w-1/2 md:w-2/5 flex items-center gap-10">
      <img
        src={logo}
        alt="devtcha logo"
        style={{ width: "40px", height: "40px" }}
      />
      <div className="h-full w-[70%] py-1">
        <form className="h-full w-full">
          <input
            type="text"
            className="h-full w-full rounded-md border-2 border-pink-300 p-2 outline-none transition-all duration-300 focus:border-[3px] focus:border-pink-400"
            placeholder="Search"
          />
        </form>
      </div>
    </div>
  );
};
