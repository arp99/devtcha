import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/auth/authSlice";
import userReducer from "./Features/User/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
