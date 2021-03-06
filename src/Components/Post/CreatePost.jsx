import { ProfileImage } from "../Header/Navigations/Profile/profileImage";
import { Button } from "../Buttons";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPostStatus } from "../../app/Features/Post/postSlice";
import { createPost, getAllPosts } from "../../app/Features/Post/AsyncThunks";

export const CreatePost = () => {
  const [postValue, setPostValue] = useState([]);
  const postRef = useRef(null);
  const { createPostStatus } = useSelector((state) => state.post);
  const { profileImageUrl } = useSelector((state) => state.user);
  const postDispatch = useDispatch();
  if (createPostStatus === "fulfilled") {
    // Remove all children of content editable div
    const childNodes = postRef.current.childNodes;
    childNodes.forEach((childNode) => postRef.current.removeChild(childNode));

    postDispatch(resetPostStatus());
    postDispatch(getAllPosts());
  }

  const userInputHandler = (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
    }
    setPostValue(getLinesOfText(postRef));
  };

  const getLinesOfText = (postRef) => {
    const childNodes = postRef.current.childNodes;
    // Get the text nodes
    const textNodes = [...childNodes].map((node) => node.textContent);
    // replace the &nbsp; with space in each word in each line and trim the words
    const modifiedTextNodes = textNodes.map((line) =>
      line.replace("&nbsp;", " ").split(/\s+/).join(" ").trim()
    );
    //filter out only text and remove breaks
    const finalTextNodes = modifiedTextNodes.filter((line) => line !== "");
    return finalTextNodes;
  };

  return (
    <div className="w-full min-h-[11rem] rounded-md shadow-lg shadow-pink-300 dark:shadow-[#293548] border border-primary-700 dark:border-primary_dark-700 flex pr-4">
      <div className="min-h-[11rem] w-1/5 flex justify-center py-4">
        <ProfileImage
          imageStyles={{ width: "60px", height: "60px", cursor: "pointer" }}
          imageClassNames="rounded-full"
          userProfileImage={profileImageUrl}
        />
      </div>
      <div className="min-h-[11rem] w-4/5 flex flex-col">
        <div className="w-full min-h-[70%] border-0 border-b border-primary-700 dark:border-primary_dark-700">
          <div
            className="w-full outline-none p-2 tracking-widest text-gray-800 dark:text-white inline-block"
            placeholder="Got something to share?"
            onKeyUp={userInputHandler}
            contentEditable={true}
            ref={postRef}
          ></div>
        </div>
        <div className="w-full h-[4rem] flex py-2">
          <Button
            variant={"primary"}
            size={"large"}
            className={`ml-auto ${
              postValue.length === 0
                ? "cursor-not-allowed disabled:opacity-60"
                : ""
            }`}
            state={createPostStatus}
            onClick={() => {
              setPostValue([]);
              postDispatch(createPost({ content: postValue }));
            }}
            disabled={postValue.length === 0 ? true : false}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};
