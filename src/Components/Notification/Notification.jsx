import { toast } from "react-toastify";
import { ActionTypes } from "../Constants/ActionTypes";

export const Notify = (notifyType, message) => {
  switch (notifyType) {
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.SIGNUP_SUCCESS:
    case ActionTypes.LOGOUT_SUCCESS:
    case ActionTypes.USER_FOLLOWED: 
    case ActionTypes.BOOKMARK_SUCCESS:
    case ActionTypes.REMOVE_BOOKMARK_SUCCESS: return toast.success(message);
    case ActionTypes.LOGIN_ERROR:
    case ActionTypes.SIGNUP_ERROR:
    case ActionTypes.LOGOUT_ERROR:
    case ActionTypes.USER_FOLLOWED_ERROR: return toast.error(message);
    default: return toast.success("success");
  }
};
