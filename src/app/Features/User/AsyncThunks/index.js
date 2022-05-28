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
  return response.data;
});

//update profile image of user
export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async ({ imageToUpload }) => {
    const response = await uploadImage(imageToUpload);
    return response.data;
  }
);

// Get user profile suggestions
export const getProfileSuggestions = createAsyncThunk(
  "user/getProfileSuggestions",
  async () => {
    const response = await profileSuggestionService();
    return response.data;
  }
);

// Follow user
export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ userToFollowId }) => {
    const response = await followUserService(userToFollowId);
    return response.data;
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async ({ userToUnfollowId }) => {
    const response = await unFollowUserService(userToUnfollowId);
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
