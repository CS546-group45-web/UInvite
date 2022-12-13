import { makeApiCall } from "./api";

export const CreateEvent = async (event) => await makeApiCall("/api/auth/", "post",event);
export const getEvent = async (eventid) =>
  await makeApiCall("/api/user/" + eventid, "get");
export const editEvent = async (body) =>
  await makeApiCall("/api/user/edit", "post", body);