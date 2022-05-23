import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  addReaction,
  deletePost,
} from "./AsyncThunks";

const postInitialState = {
  allPosts: [],
  createPostStatus: "idle",
  createPostError: null,
  fetchPostStatus: "idle",
  fetchPostError: null,
  addReactionStatus: "idle",
  addReactionError: null,
  deletePostStatus: "idle",
  deletePostError: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  reducers: {
    resetReactionStatus: (state) => {
      state.addReactionStatus = "idle";
      state.addReactionError = null;
    },
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
      state.allPosts = action.payload.posts;
      state.fetchPostStatus = "fulfilled";
      state.fetchPostError = null;
    },
    [getAllPosts.rejected]: (state) => {
      state.fetchPostStatus = state.fetchPostError = "error";
    },
    [addReaction.pending]: (state) => {
      state.addReactionStatus = "loading";
      state.addReactionError = null;
    },
    [addReaction.fulfilled]: (state, action) => {
      console.log("Inside extra reducer of addReaction: ", action.payload);
      // toggle reaction from client side here
      const { postId, userId, reaction } = action.payload;
      //find which post reaction to update, and return updated posts
      const updatedPosts = state.allPosts.map((post) => {
        if (post._id === postId) {
          //now go to the reactions of this post and toggle the userId
          const reactionToUpdate = [...post.reactions[reaction]];
          //getting no. of users who reacted to this reaction
          const currentReactionsCount = reactionToUpdate.length;
          //if no reactions of this type is there simply add this userId here
          if (currentReactionsCount === 0) {
            return {
              ...post,
              reactions: { ...post.reactions, [reaction]: [userId] },
            };
          } else {
            //Filtering out if the current user has already reacted or not
            let updatedReactions = reactionToUpdate.filter(
              (id) => id !== userId
            );
            //Now after filtering out if current reactions count is same as before, then the current user had
            //never reacted to that before, so add the user's reaction else update whith filtered reactions
            updatedReactions =
              updatedReactions.length === currentReactionsCount
                ? [...updatedReactions, userId]
                : updatedReactions;

            return {
              ...post,
              reactions: { ...post.reactions, [reaction]: updatedReactions },
            };
          }
        }
        return post;
      });
      state.allPosts = updatedPosts;
      state.addReactionStatus = "fulfilled";
      state.addReactionError = null;
    },
    [addReaction.rejected]: (state) => {
      state.addReactionStatus = state.addReactionError = "error";
    },
    [deletePost.pending]: (state) => {
      state.deletePostStatus = "loading";
      state.deletePostError = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      console.log("Inside extraReducers of deletePost: ", action.payload);
      const { postId } = action.payload;
      // TODO: Change the post state here
      state.deletePostStatus = "fulfilled";
    },
    [deletePost.rejected]: (state) => {
      state.deletePostStatus = state.deletePostError = "error";
    },
  },
});

export const { resetPostStatus, resetReactionStatus } = postSlice.actions;
export default postSlice.reducer;
