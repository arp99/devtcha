import { Header, CreatePost, ViewPost } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../app/Features/Post/postSlice";
import { useEffect } from "react";

export const Home = () => {
  const postDispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.post);
  console.log({ allPosts });
  useEffect(() => {
    postDispatch(getAllPosts());
  }, [postDispatch]);
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="w-full min-h-screen">
        <div className="max-w-3xl min-h-screen mx-auto border-x border-primary-700 pt-16">
          <CreatePost />
          <div className="w-full p-2">
            <h1 className="text-3xl font-semibold text-primary-700">
              Post feeds
            </h1>
          </div>
          {/* Show all the posts feed for the user  */}
          {allPosts.map((post) => (
            <ViewPost key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
