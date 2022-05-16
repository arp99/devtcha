import { toast } from "react-toastify";
import { ActionTypes } from "../Constants/ActionTypes";

export const Notify = (notifyType, message) => {
  switch (notifyType) {
    case ActionTypes.LOGIN_SUCCESS:
      return toast.success(message);
    case ActionTypes.LOGIN_ERROR:
      return toast.error(message);
    case ActionTypes.SIGNUP_SUCCESS:
      return toast.success(message);
    case ActionTypes.SIGNUP_ERROR:
      return toast.error(message);
    case ActionTypes.LOGOUT_SUCCESS:
      return toast.success(message);
    case ActionTypes.LOGOUT_ERROR:
      return toast.error(message);
    default:
      return toast.success("success");
  }
};
