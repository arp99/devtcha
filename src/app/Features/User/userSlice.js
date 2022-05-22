import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ActionTypes } from "../../../Components/Constants/ActionTypes";
import { Notify } from "../../../Components/Notification/Notification";
import {
  fetchUserData,
  uploadImage,
  profileSuggestionService,
  followUserService,
  unFollowUserService,
} from "./services/userServices";
import { removeFollowedUser } from "./utils/userUtils";

//fetch current user data
export const getUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await fetchUserData();
  console.log("From async thunk user slice: ", { response });
  return response.data;
});

//update profile image of user
export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async ({ imageToUpload }) => {
    const response = await uploadImage(imageToUpload);
    console.log("Inside updateProfile async thunk: ", response.data);
    return response.data;
  }
);

// Get user profile suggestions
export const getProfileSuggestions = createAsyncThunk(
  "user/getProfileSuggestions",
  async () => {
    const response = await profileSuggestionService();
    console.log("Inside getProfileSuggestions async thunk: ", response.data);
    return response.data;
  }
);

// Follow user
export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ userToFollowId }) => {
    const response = await followUserService(userToFollowId);
    console.log("Inside followUser async thunk: ", response.data);
    return response.data;
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async ({ userToUnfollowId }) => {
    const response = await unFollowUserService(userToUnfollowId);
    console.log("Inside unFollowUser async thunk: ", response.data);
    return response.data;
  }
);

const userInitialState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  profileImageUrl: "",
  followers: [],
  following: [],
  status: "idle",
  profileImageStatus: "idle",
  profileSuggestions: [],
  profileSuggestionStatus: "idle",
  followUserStatus: "idle",
  unFollowUserStatus: "idle",
  profileSuggestionError: null,
  profileImageUploadError: null,
  followUserError: null,
  unFollowUserError: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    resetUserState: (state) => {
      state.status = "idle";
      state.firstName = "";
      state.lastName = "";
      state.userName = "";
      state.email = "";
      state.profileImageUrl = "";
      state.followers = [];
      state.following = [];
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getUserData.fulfilled]: (state, action) => {
      console.log("Inside extraReducers of getUserData: ", action.payload);
      const {
        firstName,
        lastName,
        userName,
        email,
        profileImageUrl,
        followers,
        following,
      } = action.payload.data;
      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;
      state.email = email;
      state.profileImageUrl = profileImageUrl;
      state.followers = followers;
      state.following = following;
      state.status = "fulfilled";
    },
    [getUserData.rejected]: (state) => {
      state.status = state.error = "error";
    },
    [updateProfileImage.pending]: (state) => {
      state.profileImageStatus = "loading";
      state.profileImageUploadError = null;
    },
    [updateProfileImage.fulfilled]: (state, action) => {
      console.log("Inside extraReducers of update Profile: ", action.payload);
      // const { url } = action.payload;
      state.profileImageUrl = action.payload.data;
      state.profileImageStatus = "fulfilled";
    },
    [updateProfileImage.rejected]: (state) => {
      state.profileImageStatus = state.profileImageUploadError = "error";
    },
    [getProfileSuggestions.pending]: (state) => {
      state.profileSuggestionStatus = "loading";
      state.profileSuggestionError = null;
    },
    [getProfileSuggestions.fulfilled]: (state, action) => {
      console.log(
        "Inside extraReducers of getProfileSuggestions: ",
        action.payload
      );
      state.profileSuggestions = action.payload.suggestedProfiles;
      state.profileSuggestionStatus = "fulfilled";
      state.profileSuggestionError = null;
    },
    [getProfileSuggestions.rejected]: (state) => {
      state.profileSuggestionStatus = state.profileSuggestionError = "error";
    },
    [followUser.pending]: (state) => {
      state.followUserStatus = "loading";
      state.followUserError = null;
    },
    [followUser.fulfilled]: (state, action) => {
      console.log("Inside extraReducers of followUser: ", action.payload);
      const userFollowedId = action.payload.data._id;
      state.followUserStatus = "fulfilled";
      state.profileSuggestions = removeFollowedUser(
        state.profileSuggestions,
        userFollowedId
      );
      Notify(ActionTypes.USER_FOLLOWED, "User Followed Successfully");
    },
    [followUser.rejected]: (state) => {
      state.followUserStatus = state.followUserError = "error";
      Notify(ActionTypes.USER_FOLLOWED_ERROR, "User cannot be followed");
    },
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
