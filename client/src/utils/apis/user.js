import { makeApiCall } from "./api";

export const getUserDetails = async () => makeApiCall("/api/auth", "get");

export const getUserDetailsByUsername = async (username) =>
  await makeApiCall("/api/user/" + username, "get");
export const editUserDetails = async (body) =>
  await makeApiCall("/api/user/edit", "post", body);

export const profilePhotoUpload = async (data) =>
  await makeApiCall("/api/user/profileImage", "post", data);

export const followUser = async (id) =>
  await makeApiCall("/api/user/follow/" + id, "get");

export const unfollowUser = async (id) =>
  await makeApiCall("/api/user/unfollow/" + id, "get");

export const getUserFollowers = async () =>
  await makeApiCall("/api/user/followers", "get");

export const getUserFollowing = async () =>
  await makeApiCall("/api/user/following", "get");
export const getOtherUserFollowersById = async (id) =>
  await makeApiCall("/api/user/followers/" + id, "get");

export const getOtherUserFollowing = async (id) =>
  await makeApiCall("/api/user/following/" + id, "get");
