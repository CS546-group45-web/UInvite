import { makeApiCall } from "./api";

export const getUserDetails = async () => {
  await makeApiCall("api/auth", "get");
};
