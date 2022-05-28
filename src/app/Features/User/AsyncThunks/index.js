import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  bookmarkPostService,
  fetchUserData,
  followUserService,
  profileSuggestionService,
  removeBookmarkService,
  unFollowUserService,
  uploadImage,
} from "../services/userServices";

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
    // console.log({ userToUnfollowId });
    const response = await unFollowUserService(userToUnfollowId);
    console.log("Inside unFollowUser async thunk: ", response.data);
    return response.data;
  }
);

export const bookmarkPost = createAsyncThunk(
  "post/bookmarkPost",
  async ({ post }) => {
    const response = await bookmarkPostService(post._id);
    return {
      data: response.data,
      post,
    };
  }
);

export const removeBookmark = createAsyncThunk(
  "post/removeBookmark",
  async ({ post }) => {
    const response = await removeBookmarkService(post._id);
    return {
      data: response.data,
      post,
    };
  }
);
