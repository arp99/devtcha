import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/auth/authSlice";
import userReducer from "./Features/User/userSlice";
import postReducer from "./Features/Post/postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
  },
});
