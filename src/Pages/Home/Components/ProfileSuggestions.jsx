import { useSelector } from "react-redux";
import { ProfileSuggestionCard } from "./ProfileSuggestionCard";

export const Profilesuggestions = () => {
  const { profileSuggestions } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-[9rem] absolute top-16 right-0 col-start-4 shadow-lg shadow-pink-300">
      <h1 className="text-lg font-bold text-primary-700 border-0 border-b-2 p-2 border-primary-700">
        People You might know
      </h1>
      {profileSuggestions &&
        profileSuggestions
          .slice(0, 5)
          .map((profile) => (
            <ProfileSuggestionCard {...profile} key={profile._id} />
          ))}
    </div>
  );
};
