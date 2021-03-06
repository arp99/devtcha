import { axiosAuthorization } from "../../auth/services/axiosInstance";
import axios from "axios";

export const fetchUserData = async () => {
  return axiosAuthorization.get("user");
};

export const uploadImage = async (uploadedImage) => {
  let uploadedUrl = "";
  const data = new FormData();
  data.append("file", uploadedImage);
  data.append("upload_preset", "jdu0mhef");
  data.append("cloud_name", "arp99");
  data.append("folder", "profile-images");
  try {
    const response = await axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/arp99/image/upload",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    uploadedUrl = response.data.url;
    return axiosAuthorization.post("user/update-profile-picture", {
      profileImageUrl: uploadedUrl,
    });
  } catch (err) {
    return Promise.reject(new Error(err.message));
  }
};

export const profileSuggestionService = async () => {
  return axiosAuthorization.get("user/suggestion");
};

export const followUserService = async (userToFollowId) => {
  return axiosAuthorization.post("user/follow", {
    userToFollowId,
  });
};

export const unFollowUserService = async (userToUnfollowId) => {
  return axiosAuthorization.delete("user/unfollow", {
    data: {
      userToUnfollowId,
    },
  });
};

export const bookmarkPostService = async (postId) =>
  axiosAuthorization.post(`post/bookmark/${postId}`);

export const removeBookmarkService = async (postId) =>
  axiosAuthorization.delete(`post/bookmark/${postId}`);
