import logo from "../../../assets/logo.png";

export const Searchbar = () => {
  return (
    <div className="h-full w-full sm:w-1/2 md:w-2/5 flex items-center gap-10 justify-center">
      <img
        src={logo}
        alt="devtcha logo"
        style={{ width: "40px", height: "40px" }}
      />
      
    </div>
  );
};
