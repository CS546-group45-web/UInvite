import { makeApiCall } from "./api";

export const createEvent = async (data) =>
  await makeApiCall("/api/events", "post", data);
export const getEventsDetailsById = async (id) =>
  await makeApiCall("/api/events/id/" + id, "get");
export const editEvent = async (id, data) =>
  await makeApiCall("/api/events/update/" + id, "post", data);

export const getAllEventsForHomePage = async () =>
  await makeApiCall("/api/events", "get");

export const postComment = async (comment, id) =>
  await makeApiCall("/api/events/" + id + "/comment", "post", { comment });
