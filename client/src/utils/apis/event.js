import { makeApiCall } from "./api";

export const createEvent = async (data) =>
  await makeApiCall("/api/events", "post", data);

export const getEventsDetailsById = async (id) =>
  await makeApiCall("/api/events/id/" + id, "get");

export const deleteEventsDetailsById = async (id) =>
  await makeApiCall("/api/events/id/" + id, "delete");

export const editEvent = async (id, data) =>
  await makeApiCall("/api/events/update/" + id, "post", data);

export const getAllEventsForHomePage = async () =>
  await makeApiCall("/api/events", "get");

export const getAllUpcomingEvents = async () =>
  await makeApiCall("/api/events/upcoming", "get");

export const postComment = async (comment, id) =>
  await makeApiCall("/api/events/comment/" + id, "post", { comment });

export const eventPhotoUpload = async (id, data) =>
  await makeApiCall("/api/events/image/" + id, "post", data);

export const bookmarkEvent = async (id) =>
  await makeApiCall("/api/events/bookmark/" + id, "get");

export const removeBookmarkedEvent = async (id) =>
  await makeApiCall("/api/events/unbookmark/" + id, "get");

export const rsvpEvent = async (id) =>
  await makeApiCall("/api/events/rsvp/" + id, "get");

export const cancelRsvpEvent = async (id) =>
await makeApiCall("/api/events/removeRsvp/" + id, "get");

  export const getRsvpedListToEvent = async (id) =>
await makeApiCall("/api/events/rsvpList/" + id, "get");
