import { ProfileImage } from "../Header/Navigations/Profile/profileImage";
import { Button } from "../Buttons"

export const CreatePost = () => {
  return (
    <div className="w-full h-44 rounded-md shadow-lg shadow-pink-300 border border-primary-700 flex pr-4">
      <div className="h-full w-1/5 flex justify-center py-4">
        <ProfileImage
          imageStyles={{ width: "60px", height: "60px", cursor: "pointer" }}
          imageClassNames="rounded-full"
        />
      </div>
      <div className="h-full w-4/5 flex flex-col">
        <div className="w-full h-[70%] border-0 border-b border-primary-700">
          <textarea
            className="w-full h-full resize-none outline-none p-2 tracking-widest text-gray-800"
            placeholder="Got something to share?"
          />
        </div>
        <div className="w-full h-[30%] flex py-2">
          <Button variant={"primary"} size={"large"} className="ml-auto">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};
