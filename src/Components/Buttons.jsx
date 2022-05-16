import ClipLoader from "react-spinners/ClipLoader";

export const Button = ({
  children,
  variant,
  size,
  state,
  className,
  loaderColor="white",
  ...props
}) => {
  return (
    <button
      className={`w-max rounded-md shadow-xl ${
        variant === "primary"
          ? `bg-gradient-to-r from-primary-700 to-pink-600 text-white shadow-md shadow-pink-500 transition-transform duration-[300ms] hover:-translate-y-[4px]`
          : ``
      }
        ${
          variant === "secondary"
            ? `border-2 border-solid border-red-400 text-red-500`
            : ``
        }
        ${
          variant === "github"
            ? `bg-gradient-to-r from-[#24292F] to-[#424547] text-white justify-center flex gap-4 items-center shadow-md shadow-[#747677d3] transition-transform duration-[300ms] hover:-translate-y-[4px]`
            : ``
        }

        ${size === "small" ? `py-2 px-4` : ``}
        ${size === "large" ? `py-2 px-8` : ``}
        ${size === "full" ? `py-2 px-8 w-full` : ``}
        ${size === "xSmall" ? `py-1 px-2` : ``}
        ${state === "fulfilled" ? `cursor-not-allowed` : ``}
        
        ${className}
        `}
      {...props}
    >
      {state === "loading" ? (
        <>
          Please Wait <ClipLoader size={15} color={loaderColor} loading={true} />
        </>
      ) : (
        children
      )}
    </button>
  );
};
