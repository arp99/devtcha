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
      const { _id, firstName, lastName, profileImageUrl, userName } =
        action.payload.data;
      state.following = [
        ...state.following,
        { _id, firstName, lastName, profileImageUrl, userName },
      ];
      state.followUserStatus = "fulfilled";
      state.profileSuggestions = removeFollowedUser(
        state.profileSuggestions,
        _id
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
      const { post } = action.payload;
      state.bookmarks = state.bookmarks.filter(({ _id }) => _id !== post._id);
      state.removeBookmarkStatus = "fulfilled";
      Notify(ActionTypes.REMOVE_BOOKMARK_SUCCESS, "Bookmark Removed");
    },
    [removeBookmark.rejected]: (state) => {
      state.removeBookmarkStatus = state.removeBookmarkError = "error";
    },
    [unFollowUser.pending]: (state) => {
      state.unFollowUserStatus = "loading";
      state.unFollowUserError = null;
    },
    [unFollowUser.fulfilled]: (state, action) => {
      const { _id } = action.payload.data;
      state.following = state.following.filter((user) => user._id !== _id);
      state.unFollowUserStatus = "fulfilled";
      state.unFollowUserError = null;
      Notify(ActionTypes.USER_UNFOLLOWED, "Unfollowed User");
    },
    [unFollowUser.rejected]: (state) => {
      state.unFollowUserStatus = state.unFollowUserError = "error";
      Notify(ActionTypes.USER_UNFOLLOWED_ERROR, "Cannot Unfollow user!");
    },
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
