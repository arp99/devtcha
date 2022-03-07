import axiosInstance, { axiosAuthorization } from "./axiosInstance";

export const loginUser = async (email, password) => {
  return axiosInstance.post("login", {
    email,
    password,
  });
};

export const signupUser = async (
  firstName,
  lastName,
  email,
  password,
  userName
) => {
  return axiosInstance.post("signup", {
    firstName,
    lastName,
    email,
    password,
    userName,
  });
};

export const followUser = async (userToFollowId) => {
  return axiosAuthorization.post("follow", {
    userToFollowId,
  });
};

export const unFollowUser = async (userToUnfollowId) => {
  return axiosAuthorization.post("unfollow", {
    userToUnfollowId,
  });
};
