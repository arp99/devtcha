import ClipLoader from "react-spinners/ClipLoader";

export const Button = ({ children, variant, size, state, ...props }) => {
  return (
    <button
      className={`w-max rounded-md shadow-xl ${
        variant === "primary"
          ? `bg-gradient-to-r from-primary-700 to-pink-600 text-white`
          : ``
      }
        ${
          variant === "secondary"
            ? `border-2 border-solid border-red-400 text-red-500`
            : ``
        }
        ${size === "small" && `py-2 px-4`}
        ${size === "large" && `py-2 px-8`}
        ${size === "xSmall" && `py-1 px-2`}
        ${state === "fulfilled" && `cursor-not-allowed`}
        `}
      {...props}
    >
      {state === "loading" ? (
        <>
          Please Wait <ClipLoader size={15} color="white" loading={true} />
        </>
      ) : (
        children
      )}
    </button>
  );
};
