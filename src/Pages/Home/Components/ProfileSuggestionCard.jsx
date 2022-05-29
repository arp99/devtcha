import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../app/Features/Post/AsyncThunks";
import { followUser } from "../../../app/Features/User/AsyncThunks";
import { Button } from "../../../Components";

export const ProfileSuggestionCard = ({
  firstName,
  lastName,
  profileImageUrl,
  userName,
  _id,
}) => {
  const [follow, setFollow] = useState(false);
  const { followUserStatus } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (followUserStatus === "fulfilled") {
      dispatch(getAllPosts());
      setFollow(false);
    }
  }, [followUserStatus, dispatch]);

  return (
    <div
      className="w-full p-2 border-0 border-b-2 border-primary-700 dark:border-primary_dark-700 flex"
      key={_id}
    >
      <div className="w-1/4 h-full">
        <img
          src={
            profileImageUrl
              ? profileImageUrl
              : `https://ui-avatars.com/api/?size=200&background=F472B6&rounded=true&name=${firstName}+${lastName}`
          }
          alt="profile pic"
          className="w-3/5 h-3/5 rounded-full"
        />
      </div>
      <div className=" w-full h-full flex md:flex-col lg:flex-row justify-between">
        <div>
          <p className="font-semibold dark:text-white">
            {firstName} {lastName}
          </p>
          <p className="text-gray-600">@{userName}</p>
        </div>
        <div>
          <Button
            size={"small"}
            variant={"secondary"}
            loaderColor={"salmon"}
            state={follow && "loading"}
            onClick={() => {
              setFollow(true);
              dispatch(followUser({ userToFollowId: _id }));
            }}
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};
