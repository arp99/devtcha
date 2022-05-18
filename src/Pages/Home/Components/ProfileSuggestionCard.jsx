import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../../app/Features/User/userSlice";
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
      console.log({ followUserStatus });
      setFollow(false);
    }
  }, [followUserStatus]);

  return (
    <div
      className="w-full p-2 border-0 border-b-2 border-primary-700 flex"
      key={_id}
    >
      <div className="w-1/4 h-full">
        <img
          src={profileImageUrl}
          alt="profile pic"
          className="w-3/5 h-3/5 rounded-full"
        />
      </div>
      <div className=" w-full h-full flex justify-between">
        <div>
          <p className="font-semibold">
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
              // setFollow(false);
            }}
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};