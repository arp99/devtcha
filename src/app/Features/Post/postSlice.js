import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPostService } from "./services/postServices";

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ content }) => {
    console.log({ content })
    const response = await createPostService(content);
    console.log("From post async thunk : ", { response });
    return response.data;
  }
);

const postInitialState = {
  createPostStatus: "idle",
  createPostError: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  reducers: {
    resetPostStatus: (state) => {
      state.createPostError = null;
      state.createPostStatus = "idle";
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
  },
});

export const { resetPostStatus } = postSlice.actions;
export default postSlice.reducer;
