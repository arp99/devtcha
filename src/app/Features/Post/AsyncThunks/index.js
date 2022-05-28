import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addReactionService,
  bookmarkPostService,
  createPostService,
  deletePostService,
  getAllPostsService,
  removeBookmarkService,
} from "../services/postServices";

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ content }) => {
    const response = await createPostService(content);
    return response.data;
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  const response = await getAllPostsService();
  return response.data;
});

export const addReaction = createAsyncThunk(
  "post/addReaction",
  async ({ postId, reaction }) => {
    const response = await addReactionService(postId, reaction);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ post }) => {
    const response = await deletePostService(post._id);
    return {
      data: response.data,
      postId : post._id
    };
  }
);


