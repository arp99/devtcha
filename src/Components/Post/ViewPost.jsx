import { ProfileImage } from "../Header/Navigations/Profile/profileImage";

export const ViewPost = ({ post }) => {
  console.log(post);
  const { content, user } = post;
  // Each items in contents becomes a paragraph element
  return (
    <div className="w-full h-full rounded-md border border-primary-700 mb-2">
      <div className="h-full w-full flex">
        <div className="h-full w-1/5 flex justify-center py-4">
          <ProfileImage
            imageStyles={{ width: "60px", height: "60px", cursor: "pointer" }}
            imageClassNames="rounded-full"
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
                {content.map((lines) => (
                  <p>{lines}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-14 w-full p-2 px-6 flex justify-evenly">
        <button className="w-max h-max p-2 transition duration-200 rounded-md hover:bg-pink-200">
          ❤ <span>0</span>
        </button>
        <button className="w-max h-max p-2 transition duration-200 rounded-md hover:bg-pink-200">
          🚀 <span>0</span>
        </button>
        <button className="w-max h-max p-2 transition duration-200 rounded-md hover:bg-pink-200">
          🎉 <span>0</span>
        </button>
        <button className="w-max h-max p-2 transition duration-200 rounded-md hover:bg-pink-200">
          👀 <span>0</span>
        </button>
      </div>
    </div>
  );
};
