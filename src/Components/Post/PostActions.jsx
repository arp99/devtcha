import { useState } from "react";
import { AiOutlineMore, AiFillDelete } from "react-icons/ai";
import { BsBookmarkCheck, BsBookmark } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../app/Features/Post/AsyncThunks";
import {
  bookmarkPost,
  removeBookmark,
} from "../../app/Features/User/AsyncThunks";
import { useTheme } from "../../Context/ThemeProvider";

export const PostActions = ({ post }) => {
  const dispatch = useDispatch();
  const [viewAction, setViewAction] = useState(false);
  const { bookmarks } = useSelector((state) => state.user);
  const { userId } = useSelector((state) => state.auth);

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
  const { theme } = useTheme()

  return (
    <div className="absolute top-1 right-2 w-9 h-28">
      <button
        className="w-full p-1 rounded-md transition-colors hover:bg-pink-200 dark:hover:bg-[#293548] dark:text-primary_dark-700"
        onClick={showActionsHandler}
      >
        <AiOutlineMore size={20} className="mx-auto" />
      </button>
      {viewAction && (
        <div className="border border-primary-700 p-2 h-max flex flex-col gap-4 rounded-sm bg-white dark:border-primary_dark-700 dark:bg-[#293548] shadow-md shadow-pink-300 dark:shadow-[#293548] ">
          {post.user._id === userId && (
            <AiFillDelete
              color={ theme === "dark" ? "rgb(45,142,190)" : "#be123c" }  
              className="cursor-pointer"
              onClick={() => dispatch(deletePost({ post }))}
            />
          )}
          {isBookmarked() && (
            <BsBookmarkCheck
              color={ theme === "dark" ? "rgb(45,142,190)" : "#be123c" } 
              className="cursor-pointer"
              onClick={removeBookmarkHandler}
            />
          )}
          {!isBookmarked() && (
            <BsBookmark
              color={ theme === "dark" ? "rgb(45,142,190)" : "#be123c" } 
              className="cursor-pointer"
              onClick={bookmarkHandler}
            />
          )}
        </div>
      )}
    </div>
  );
};
