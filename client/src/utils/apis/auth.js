import { makeApiCall } from "./api";
export const login = async (data) =>
  await makeApiCall("/api/auth", "post", data);
export const signup = async (data) =>
  await makeApiCall("/api/auth/signup", "post", data);

export const signout = async () => {
  await makeApiCall("");
};
export const forgotpassword = async (data) =>
  await makeApiCall("/api/auth/forgot", "post", data);

export const verifyUser = async (token) => {
  const url = "/api/auth/verify/" + token;
  return await makeApiCall(url, "get");
};
export const resetPassword = async (token, data) => {
  const url = "/api/auth/reset/" + token;
  return await makeApiCall(url, "post", data);
};


