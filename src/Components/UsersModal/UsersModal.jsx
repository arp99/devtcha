import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../app/Features/User/AsyncThunks";
import { Button } from "../Buttons";

export const UsersModal = ({ users, setShowModal, title }) => {
  const { following } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isFollowing = (userId, following) => {
    return following.find((user) => user._id === userId) ? true : false;
  };

  return (
    <div
      className="w-full h-screen fixed top-0 left-0 px-2 flex justify-center items-center backdrop-blur-sm z-10"
      onClick={() => setShowModal(false)}
    >
      <div
        className="w-full sm:w-3/4 md:w-2/5 overflow-y-auto bg-white shadow-2xl drop-shadow-2xl"
        style={{ maxHeight: "80%" }}
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className="w-full text-center font-semibold text-lg py-2 border-0 border-b-2 border-primary-700">
          <h1>{title}</h1>
        </div>
        {users.map(
          ({ _id, firstName, lastName, profileImageUrl, userName }) => (
            <div
              className="w-full p-2 border-0 border-b-2 border-primary-700 flex"
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
                  <p className="font-semibold">
                    {firstName} {lastName}
                  </p>
                  <p className="text-gray-600">@{userName}</p>
                </div>
                {isFollowing(_id, following) ? (
                  <Button
                    size={"small"}
                    variant={"secondary"}
                    loaderColor={"salmon"}
                    onClick={() => {
                      dispatch(unFollowUser({ userToUnfollowId: _id }));
                    }}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    size={"small"}
                    variant={"secondary"}
                    loaderColor={"salmon"}
                    onClick={() => {
                      dispatch(followUser({ userToFollowId: _id }));
                    }}
                  >
                    Follow
                  </Button>
                )}
                {/* <div>
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
                </div> */}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

// firstName: "Preetam"
// lastName: "Sarkar"
// profileImageUrl: "http://res.cloudinary.com/arp99/image/upload/v1652899069/profile-images/pwgoxixut3modui2knq6.png"
// userName: "preetam"
// _id:
