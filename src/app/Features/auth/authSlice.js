import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ActionTypes } from "../../../Components/Constants/ActionTypes";
import { Notify } from "../../../Components/Notification/Notification";
import {
  loginUser,
  signupUser,
  followUser,
  unFollowUser,
} from "./services/authServices";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await loginUser(email, password);
    console.log("From login async thunk: ", { response });
    return response.data;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ firstName, lastName, email, password, userName }) => {
    const response = await signupUser(
      firstName,
      lastName,
      email,
      password,
      userName
    );
    console.log("From signup user async thunk: ", { response });
    return response.data;
  }
);

export const followButtonClicked = createAsyncThunk(
  "auth/followButtonClicked",
  async (userToFollowId) => {
    const response = await followUser(userToFollowId);
    if (response.data.success === false) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  }
);

export const unFollowButtonClicked = createAsyncThunk(
  "auth/unFollowButtonClicked",
  async (userToUnfollowId) => {
    const response = await unFollowUser(userToUnfollowId);
    if (response.data.success === false) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  }
);

const authInitialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("id") || null,
  loggedInStatus: localStorage.getItem("token") ? "fulfilled" : "idle",
  loggedInError: null,
  signupStatus: "idle",
  signupError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      state.token = null;
      state.userId = null;
      state.loggedInStatus = "idle";
      state.loggedInError = null;
      Notify(ActionTypes.LOGOUT_SUCCESS, "Logout Succesfull");
    },
    resetAuthStatus: (state) => {
      state.loggedInError = null;
      state.signupStatus = "idle";
      state.signupError = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loggedInStatus = "loading";
      state.loggedInError = null;
    },
    [login.fulfilled]: (state, action) => {
      console.log("From extra reducer in login: ", action.payload);
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
      state.loggedInStatus = "fulfilled";
      localStorage.setItem("token", token);
      localStorage.setItem("id", userId);
      Notify(ActionTypes.LOGIN_SUCCESS, "Login Successfull");
    },
    [login.rejected]: (state) => {
      state.loggedInStatus = state.loggedInError = "error";
      Notify(ActionTypes.LOGIN_ERROR, "Unable to Login")
    },
    [signup.pending]: (state) => {
      state.signupStatus = "loading";
      state.signupError = null;
    },
    [signup.fulfilled]: (state, action) => {
      console.log("From extra reducers in signup:", action.payload);
      state.signupStatus = "fulfilled";
      Notify(ActionTypes.SIGNUP_SUCCESS, "Successfully registered");
    },
    [signup.rejected]: (state) => {
      state.signupStatus = state.signupError = "error";
      Notify(ActionTypes.SIGNUP_ERROR, "Error in registration");
    },
  },
});

export const { logout, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
