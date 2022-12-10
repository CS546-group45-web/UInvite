import { makeApiCall } from "./api";

export const getUserDetails = async () => await makeApiCall("/api/auth", "get");
export const editUserDetails = async (body) =>
  await makeApiCall("/api/auth/edit", "post", body);
