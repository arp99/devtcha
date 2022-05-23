import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../../app/Features/User/AsyncThunks";
import { useNavigate } from "react-router-dom"

export const ProfileImage = ({ imageStyles, imageClassNames }) => {
  const dispatch = useDispatch();
  const { status, profileImageUrl, firstName, lastName } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  useEffect(() => {
    if (token && status === "idle") {
      dispatch(getUserData());
    }
  }, [dispatch, status, token]);

  return (
    <>
      { status === "fulfilled" && (!profileImageUrl || profileImageUrl?.length === 0) && (
        <img
          src={`https://ui-avatars.com/api/?size=200&background=F472B6&rounded=true&name=${firstName}+${lastName}`}
          alt="profile"
          style={{...imageStyles}}
          onClick={()=> navigate("/user")}
        />
      )}
      { status === "fulfilled" && (profileImageUrl && profileImageUrl?.length > 1) && (
        <img
          src={profileImageUrl}
          alt="profile"
          style={{...imageStyles}}
          className={ imageClassNames }
          onClick={()=> navigate("/user")}
        />
      )}
    </>
  );
};
