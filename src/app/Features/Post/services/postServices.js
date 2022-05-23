import { axiosAuthorization } from "../../auth/services/axiosInstance";

export const createPostService = async (content) => {
  return axiosAuthorization.post("post", {
    content,
  });
};

export const getAllPostsService = async () => axiosAuthorization.get("post");

export const addReactionService = async (postId, reaction) => {
  return axiosAuthorization.post(`post/${postId}/${reaction}`);
};

export const deletePostService = async (postId) =>
  axiosAuthorization.delete(`post/${postId}`);
