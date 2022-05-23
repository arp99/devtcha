import { useState } from "react";
import { AiOutlineMore, AiFillDelete } from "react-icons/ai";
import { BsBookmarkCheck, BsBookmark } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmarkPost,
  removeBookmark,
} from "../../app/Features/User/AsyncThunks";

export const PostActions = ({ post }) => {
  const dispatch = useDispatch();
  const [viewAction, setViewAction] = useState(false);
  const { bookmarks } = useSelector((state) => state.user);
  const showActionsHandler = () => {
    setViewAction((prev) => !prev);
  };

  const bookmarkHandler = () => {
    dispatch(bookmarkPost({ post }));
  };

  const removeBookmarkHandler = () => {
    dispatch(removeBookmark({ post }));
  };

  const isBookmarked = () => {
    const foundPost = bookmarks.find(({ _id }) => _id === post._id);
    return foundPost ? true : false;
  };

  return (
    <div className="absolute top-1 right-2 w-9 h-28">
      <button
        className="w-full p-1 rounded-md transition-colors hover:bg-pink-200"
        onClick={showActionsHandler}
      >
        <AiOutlineMore size={20} className="mx-auto" />
      </button>
      {viewAction && (
        <div className="border border-primary-700 p-2 h-16 flex flex-col justify-between rounded-sm bg-white shadow-md shadow-pink-300">
          <AiFillDelete color="#be123c" className="cursor-pointer" />
          {isBookmarked() && (
            <BsBookmarkCheck
              color="#be123c"
              className="cursor-pointer"
              onClick={removeBookmarkHandler}
            />
          )}
          {!isBookmarked() && (
            <BsBookmark
              color="#be123c"
              className="cursor-pointer"
              onClick={bookmarkHandler}
            />
          )}
        </div>
      )}
    </div>
  );
};
