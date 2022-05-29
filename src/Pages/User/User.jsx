import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProfileImage } from "../../app/Features/User/AsyncThunks";
import { Button, ViewPost } from "../../Components";
import { logout } from "../../app/Features/auth/authSlice";
import { resetUserState } from "../../app/Features/User/userSlice";
import { MdEdit } from "react-icons/md";
import { UsersModal } from "../../Components/UsersModal/UsersModal";

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
    bookmarks,
  } = useSelector((state) => state.user);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  return (
    <div className="w-100 min-h-screen dark:bg-[#0f172a]">
      <div className="w-100 min-h-screen md:w-4/5 lg:w-2/4 md:mx-auto bg-white dark:bg-[#1f2a43] p-4 shadow-xl">
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
                  <span className="w-4/6 flex justify-between items-center text-primary-700 dark:text-primary_dark-700">
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
              <h1 className="text-lg dark:text-white">
                {firstName} {lastName}
              </h1>
              <p className="text-gray-500">@{userName}</p>
              <div className="w-100">
                <span
                  role={"button"}
                  className="mr-3 dark:text-primary_dark-700"
                  onClick={() => followers.length > 0 && setShowFollowers(true)}
                >
                  {followers.length}{" "}
                  {followers.length > 1 ? "followers" : "follower"}
                </span>
                {showFollowers && (
                  <UsersModal
                    users={followers}
                    setShowModal={setShowFollowers}
                    title="Followers"
                  />
                )}
                <span
                  role={"button"}
                  className="dark:text-primary_dark-700"
                  onClick={() => following.length > 0 && setShowFollowing(true)}
                >
                  {following.length} following
                </span>
                {showFollowing && (
                  <UsersModal
                    users={following}
                    setShowModal={setShowFollowing}
                    title="Following"
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {status === "fulfilled" && (
          <>
            <h1 className="text-primary-700 dark:text-primary_dark-700 font-semibold text-lg text-center">
              Bookmarks
            </h1>
            <div className="w-full md:w-4/5 mx-auto">
              {bookmarks.length === 0 && <p>Nothing in Bookmarks</p>}
              {bookmarks.map((post) => (
                <ViewPost key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
