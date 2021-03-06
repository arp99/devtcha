import { Header, CreatePost, ViewPost } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../app/Features/Post/AsyncThunks";
import { getProfileSuggestions } from "../../app/Features/User/AsyncThunks";
import { useEffect } from "react";
import { Profilesuggestions } from "./Components/ProfileSuggestions";

export const Home = () => {
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getProfileSuggestions());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen pb-10 dark:bg-[#0f172a]">
      <Header />
      <div className="w-full min-h-screen grid grid-cols-4 relative">
        <div className="min-h-screen mx-8 pt-16 col-start-1 col-span-4 md:col-start-1 md:col-span-3 lg:col-start-2 lg:col-span-2">
          <CreatePost />
          <div className="w-full p-2">
            <h1 className="text-3xl font-semibold text-primary-700 dark:text-primary_dark-700">
              Post feeds
            </h1>
          </div>
          {allPosts.length === 0 && (
            <p className="text-primary-700 dark:text-primary_dark-700 text-center">
              Follow users to see their posts, meanwhile create a post 😓
            </p>
          )}
          {/* Show all the posts feed for the user  */}
          {allPosts.map((post) => (
            <ViewPost key={post._id} post={post} />
          ))}
        </div>
        <Profilesuggestions />
      </div>
    </div>
  );
};
