import { makeApiCall } from "./api";

export const getUserDetails = async () => await makeApiCall("/api/auth", "get");
export const getUserDetailsByUsername = async (username) =>
  await makeApiCall("/api/user/" + username, "get");
export const editUserDetails = async (body) =>
  await makeApiCall("/api/user/edit", "post", body);

export const profilePhotoUpload = async (data) =>
  await makeApiCall("/api/user/profileImage", "post", data);
