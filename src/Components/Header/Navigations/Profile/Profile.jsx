import { useSelector } from "react-redux";
import { ProfileImage } from "./profileImage";

export const Profile = () => {
  const { profileImageUrl } = useSelector((state) => state.user);
  return (
    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full">
      <ProfileImage
        imageStyles={{ width: "30px", height: "30px", cursor: "pointer" }}
        imageClassNames="rounded-full transition-transform hover:scale-[.80]"
        userProfileImage={profileImageUrl}
      />
    </div>
  );
};
