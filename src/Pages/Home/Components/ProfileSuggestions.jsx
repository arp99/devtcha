import { useSelector } from "react-redux";
import { Button } from "../../../Components";

export const Profilesuggestions = () => {
  const { profileSuggestions } = useSelector((state) => state.user);
  return (
    <div className="w-full min-h-[9rem] absolute top-16 right-0 col-start-4 shadow-lg shadow-pink-300">
      <h1 className="text-lg font-bold text-primary-700 border-0 border-b-2 p-2 border-primary-700">People You might know</h1>
      {
        profileSuggestions && profileSuggestions.map(({ firstName, lastName, profileImageUrl, userName, _id }) => (
          <div className="w-full p-2 border-0 border-b-2 border-primary-700 flex" key={_id}>
            <div className="w-1/4 h-full">
              <img src={profileImageUrl} alt="profile pic" className="w-3/5 h-3/5 rounded-full" />
            </div>
            <div className=" w-full h-full flex justify-between">
              <div>
                <p className="font-semibold">{firstName} {lastName}</p>
                <p className="text-gray-600">@{userName}</p>
              </div>
              <div>
                <Button size={'small'} variant={'secondary'} loaderColor={'salmon'}>Follow</Button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};
