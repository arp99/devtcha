export const removeFollowedUser = (suggestions, userId) =>
  suggestions.filter((profile) => profile._id !== userId);
