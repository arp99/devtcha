import { useDispatch, useSelector } from "react-redux";
import { addReaction } from "../../app/Features/Post/AsyncThunks";
import { addReactionInBookmarks } from "../../app/Features/User/userSlice";
import { PostActions } from "./PostActions";

export const ViewPost = ({ post }) => {
  const postDispatch = useDispatch();
  const {
    content,
    user,
    _id: postId,
    reactions,
    user: { profileImageUrl, firstName, lastName },
  } = post;
  const { bookmarks } = useSelector((state) => state.user);
  const { userId } = useSelector((state) => state.auth);

  const isBookmarked = (postId) => {
    return bookmarks.find((post) => post._id === postId) ? true : false;
  };

  const addReactionInBookmark = (postId, react) => {
    postDispatch(addReactionInBookmarks({ postId, reaction: react, userId }));
  };

  return (
    <div className="w-full h-max rounded-md border border-primary-700 mb-2 relative">
      <PostActions post={post} />
      <div className="h-full w-full flex">
        <div className="h-full w-1/5 flex justify-center py-4">
          <img
            src={
              profileImageUrl
                ? profileImageUrl
                : `https://ui-avatars.com/api/?size=200&background=F472B6&rounded=true&name=${firstName}+${lastName}`
            }
            alt="profile"
            style={{ width: "60px", height: "60px", cursor: "pointer" }}
            className="rounded-full"
          />
        </div>
        <div className="h-full w-4/5 flex flex-col">
          {/* Here show the name, username and time when the post was made  */}
          <div className="w-full h-full">
            <div className="w-full outline-none p-3 tracking-widest text-gray-800 inline-block">
              <div className="w-full p-2">
                <p className="font-semibold">
                  {user.firstName} {user.lastName}{" "}
                  <span className="text-gray-600">@{user.userName}</span>
                </p>
              </div>
              <div className="w-full p-2">
                {content.map((lines, index) => (
                  <p key={index + Math.random()}>{lines}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-14 w-full p-2 px-6 flex justify-evenly">
        <button
          className="w-max h-max p-2 transition duration-200 rounded-md hover:bg-pink-200"
          onClick={() => {
            postDispatch(addReaction({ postId, reaction: "love" }));
            if (isBookmarked(postId)) {
              addReactionInBookmark(postId, "love");
            }
          }}
        >
          ❤ <span>{reactions["love"].length}</span>
        </button>
        <button
          className="w-max h-max p-2 transition duration-200 rounded-md hover:bg-pink-200"
          onClick={() => {
            postDispatch(addReaction({ postId, reaction: "rocket" }));
            if (isBookmarked(postId)) {
              addReactionInBookmark(postId, "rocket");
            }
          }}
        >
          🚀 <span>{reactions["rocket"].length}</span>
        </button>
        <button
          className="w-max h-max p-2 transition duration-200 rounded-md hover:bg-pink-200"
          onClick={() => {
            postDispatch(addReaction({ postId, reaction: "celebrate" }));
            if (isBookmarked(postId)) {
              addReactionInBookmark(postId, "celebrate");
            }
          }}
        >
          🎉 <span>{reactions["celebrate"].length}</span>
        </button>
        <button
          className="w-max h-max p-2 transition duration-200 rounded-md hover:bg-pink-200"
          onClick={() => {
            postDispatch(addReaction({ postId, reaction: "confused" }));
            if (isBookmarked(postId)) {
              addReactionInBookmark(postId, "confused");
            }
          }}
        >
          👀 <span>{reactions["confused"].length}</span>
        </button>
      </div>
    </div>
  );
};
