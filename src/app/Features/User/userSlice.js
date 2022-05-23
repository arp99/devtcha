import { createSlice } from "@reduxjs/toolkit";
import { ActionTypes } from "../../../Components/Constants/ActionTypes";
import { Notify } from "../../../Components/Notification/Notification";
import { removeFollowedUser } from "./utils/userUtils";
import {
  getUserData,
  followUser,
  getProfileSuggestions,
  unFollowUser,
  updateProfileImage,
  bookmarkPost,
  removeBookmark,
} from "./AsyncThunks";

const userInitialState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  profileImageUrl: "",
  followers: [],
  following: [],
  bookmarks: [],
  status: "idle",
  profileImageStatus: "idle",
  profileSuggestions: [],
  profileSuggestionStatus: "idle",
  followUserStatus: "idle",
  unFollowUserStatus: "idle",
  bookmarkStatus: "idle",
  removeBookmarkStatus: "idle",
  profileSuggestionError: null,
  profileImageUploadError: null,
  followUserError: null,
  unFollowUserError: null,
  bookmarkError: null,
  removeBookmarkError: null,
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
      state.bookmarks = [];
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
        bookmarks,
      } = action.payload.data;
      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;
      state.email = email;
      state.profileImageUrl = profileImageUrl;
      state.followers = followers;
      state.following = following;
      state.bookmarks = bookmarks;
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
    [bookmarkPost.pending]: (state) => {
      state.bookmarkStatus = "loading";
      state.bookmarkError = null;
    },
    [bookmarkPost.fulfilled]: (state, action) => {
      console.log("Inside extraReducers of bookmarkPost: ", action.payload);
      const { post } = action.payload;
      state.bookmarks = [...state.bookmarks, post];
      state.bookmarkStatus = "fulfilled";
      Notify(ActionTypes.BOOKMARK_SUCCESS, "Bookmarked Post");
    },
    [bookmarkPost.rejected]: (state) => {
      state.bookmarkStatus = state.bookmarkError = "error";
    },
    [removeBookmark.pending]: (state) => {
      state.removeBookmarkStatus = "loading";
      state.removeBookmarkError = null;
    },
    [removeBookmark.fulfilled]: (state, action) => {
      console.log("Inside extraReducers of removeBookmark: ", action.payload);
      const { post } = action.payload;
      state.bookmarks = state.bookmarks.filter(({ _id }) => _id !== post._id);
      state.removeBookmarkStatus = "fulfilled";
      Notify(ActionTypes.REMOVE_BOOKMARK_SUCCESS, "Bookmark Removed");
    },
    [removeBookmark.rejected]: (state) => {
      state.removeBookmarkStatus = state.removeBookmarkError = "error";
    },
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
