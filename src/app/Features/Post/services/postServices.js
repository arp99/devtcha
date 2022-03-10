import { axiosAuthorization } from "../../auth/services/axiosInstance";

export const createPostService = async (content) => {
  return axiosAuthorization.post("post", {
    content,
  });
};

export const getAllPostsService = async () => axiosAuthorization.get("post");
