import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPostService, getAllPostsService } from "./services/postServices";

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ content }) => {
    const response = await createPostService(content);
    console.log("From post async thunk : ", { response });
    return response.data;
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  const response = await getAllPostsService();
  console.log("From getAllpost async thunk: ", { response });
  return response.data;
});

const postInitialState = {
  allPosts: [],
  createPostStatus: "idle",
  createPostError: null,
  fetchPostStatus: "idle",
  fetchPostError: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  reducers: {
    resetPostStatus: (state) => {
      state.createPostError = state.fetchPostError = null;
      state.createPostStatus = state.fetchPostStatus = "idle";
    },
  },
  extraReducers: {
    [createPost.pending]: (state) => {
      state.createPostStatus = "loading";
      state.createPostError = null;
    },
    [createPost.fulfilled]: (state, action) => {
      console.log("From extra reducers of postSlice: ", action.payload);
      state.createPostStatus = "fulfilled";
      state.createPostError = null;
    },
    [createPost.rejected]: (state) => {
      state.createPostStatus = state.createPostError = "error";
    },
    [getAllPosts.pending]: (state) => {
      state.fetchPostStatus = "loading";
      state.fetchPostError = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      console.log("Inside extra reducer of getAllpost: ", action.payload);
      state.allPosts = action.payload.posts
      state.fetchPostStatus = "fulfilled";
      state.fetchPostError = null;
    },
    [getAllPosts.rejected]: (state) => {
      state.fetchPostStatus = state.fetchPostError = "error";
    },
  },
});

export const { resetPostStatus } = postSlice.actions;
export default postSlice.reducer;
