import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getUserData,
  updateProfileImage,
} from "../../app/Features/User/AsyncThunks";
import { Button } from "../../Components";
import { logout } from "../../app/Features/auth/authSlice";
import { resetUserState } from "../../app/Features/User/userSlice";
import { MdEdit } from "react-icons/md";

export const User = () => {
  const dispatch = useDispatch();
  const {
    status,
    firstName,
    lastName,
    userName,
    profileImageUrl,
    followers,
    following,
  } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && status === "idle") {
      dispatch(getUserData());
    }
  }, [dispatch, status, token]);

  return (
    <div className="w-100 min-h-screen">
      <div className="w-100 min-h-screen md:w-4/5 lg:w-2/4 md:mx-auto bg-white p-4 shadow-xl">
        {status === "loading" ? (
          <h1>Loading...</h1>
        ) : (
          <div className="w-100 border-0 border-b-2 border-solid border-gray-400">
            <div className="flex justify-between items-center w-100">
              <div className="relative h-48 flex flex-col justify-between">
                {(!profileImageUrl || profileImageUrl?.length === 0) && (
                  <img
                    src={`https://ui-avatars.com/api/?size=200&background=F472B6&rounded=true&name=${firstName}+${lastName}`}
                    alt="profile"
                    style={{ width: "150px", height: "150px" }}
                  />
                )}
                {profileImageUrl && profileImageUrl?.length > 1 && (
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    style={{ width: "150px", height: "150px" }}
                    className="rounded-full"
                  />
                )}
                <div className="relative h-auto overflow-hidden">
                  <span className="w-4/6 flex justify-between items-center text-primary-700">
                    <MdEdit />
                    Edit Photo
                  </span>
                  <input
                    type="file"
                    name="file"
                    id="file1"
                    title=" "
                    className="absolute top-0 left-0 w-40 h-6 opacity-0 transform -translate-x-6 text-xs cursor-pointer"
                    style={{ fontSize: 0 }}
                    onInput={(e) => {
                      dispatch(
                        updateProfileImage({
                          imageToUpload: e.target.files[0],
                        })
                      );
                    }}
                  />
                </div>
              </div>

              <Button
                onClick={() => {
                  dispatch(logout());
                  dispatch(resetUserState());
                }}
                variant="primary"
                size="small"
              >
                Logout
              </Button>
            </div>
            <div className="w-100">
              <h1 className="text-lg">
                {firstName} {lastName}
              </h1>
              <p className="text-gray-500">@{userName}</p>
              <div className="w-100">
                <span className="mr-3">
                  {followers.length}{" "}
                  {followers.length > 1 ? "followers" : "follower"}
                </span>
                <span>{following.length} following</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
