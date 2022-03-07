import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchUserData,
  uploadImage,
} from "./services/userServices";

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
  profileImageUploadError: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    resetUserState: (state) => {
      state.status = "idle";
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
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
