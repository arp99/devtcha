import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../../app/Features/User/userSlice";

export const Profile = () => {
  const dispatch = useDispatch();
  const { status, profileImageUrl, firstName, lastName } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && status === "idle") {
      dispatch(getUserData());
    }
  }, [dispatch, status, token]);

  return (
    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full">
      { status === "fulfilled" && (!profileImageUrl || profileImageUrl?.length === 0) && (
        <img
          src={`https://ui-avatars.com/api/?size=200&background=F472B6&rounded=true&name=${firstName}+${lastName}`}
          alt="profile"
          style={{ width: "30px", height: "30px", cursor : "pointer" }}
        />
      )}
      { status === "fulfilled" && (profileImageUrl && profileImageUrl?.length > 1) && (
        <img
          src={profileImageUrl}
          alt="profile"
          style={{ width: "30px", height: "30px", cursor : "pointer" }}
          className="rounded-full transition-transform hover:scale-[.80]"
        />
      )}
    </div>
  );
};
