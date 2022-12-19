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

export const acceptRsvpEvent = async (id) =>
  await makeApiCall("/api/events/rsvp/" + id, "get");

export const cancelRsvpEvent = async (id) =>
  await makeApiCall("/api/events/removeRsvp/" + id, "get");

export const acceptEventInvite = async (id) =>
  await makeApiCall("/api/events/accept/" + id, "get");

export const cancelEventInvite = async (id) =>
  await makeApiCall("/api/events/decline/" + id, "get");

export const getRsvpedListToEvent = async (id) =>
  await makeApiCall("/api/events/rsvpList/" + id, "get");

export const sendInviteToUser = async (id, username) =>
  await makeApiCall("/api/events/sendInvites/" + id, "post", {
    invites: username,
  });

export const getAllTags = async () =>
  await makeApiCall("/api/events/tags", "get");

export const getSearchedResults = async (query) =>
  await makeApiCall("/api/events/search?" + query, "get");

export const postRatings = async (id, rating) =>
  await makeApiCall("/api/events/rating/" + id, "post", { rating });

export const uploadEventImages = async (id, data) =>
  await makeApiCall("/api/events/eventPhoto/" + id, "post", data);
