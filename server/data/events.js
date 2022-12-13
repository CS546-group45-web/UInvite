const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
const validation = require("../utils/validation");
// const e = require("express");

const createEvent = async (
  userId,
  eventTitle,
  organizerName,
  description,
  startDateTime,
  endDateTime,
  address,
  maxRsvpsCount,
  type,
  tags
) => {
  userId = validation.checkObjectId(userId);
  eventTitle = validation.checkTitle(eventTitle, "eventTitle");
  organizerName = validation.checkNames(organizerName, "organizerName");
  description = validation.checkNames(description, "description");
  startDateTime = validation.checkEventDate(startDateTime, "startDateTime");
  endDateTime = validation.checkEventDate(endDateTime, "endDateTime");
  address = validation.checkAdress(address, "address");
  maxRsvpsCount = validation.checkRsvpCount(maxRsvpsCount, "maxRsvpsCount");
  type = validation.checkEventType(type, "type");
  tags = validation.checkTags(tags, "tags");

  const event_collection = await events();
  const newEvent = {
    userId: ObjectId(userId),
    eventTitle: eventTitle,
    organizerName: organizerName,
    description: description,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    address: address,
    date_created: new Date(),
    maxRsvpsCount: maxRsvpsCount,
    type: type,
    rsvps: [],
    waitlist: [],
    tags: tags,
    like_count: 0,
    Comments: [],
    reviews: [],
    overallRating: 0,
  };
  let getExistingEvents = await getAllEvents();
  if (getExistingEvents) {
    for (elem of getExistingEvents) {
      if (elem.eventTitle.toLowerCase() === eventTitle.toLowerCase())
        throw `Event title ${eventTitle} already exists`;
    }
  }
  const insertInfo = await event_collection.insertOne(newEvent);
  if (insertInfo.insertedCount === 0) throw "Could not add event";
  return { Event: "Inserted Successfully." };
};

const updateOverallRating = async (userId) => {
  let oRating = 0;
  const event_collection = await events();
  const getReviews = await event_collection.findOne({
    _id: ObjectId(userId),
  });
  const { reviews } = getReviews;
  if (reviews.length !== 0) {
    for (review of reviews) oRating += review.rating;
    oRating = (oRating / reviews.length).toFixed(1);
  }
  const reviewAdd = await event_collection.updateOne(
    {
      _id: ObjectId(movieId),
    },
    { $set: { overallRating: Number(oRating) } }
  );
};

const getAllEvents = async () => {
  const eventCollection = await events();
  const events_list = await eventCollection.find({}).toArray();
  if (!events_list) {
    throw new Error("Could not get all events.");
  }
  for (const element of events_list) {
    element._id = element._id.toString();
  }
  return events_list; //changed from events to event_list
};

const getEventById = async (event_id) => {
  event_id = validation.checkId(event_id);
  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: ObjectId(event_id) });
  if (event === null) throw new Error("No event with that id");
  event._id = event._id.toString();
  return event;
};
const getEventsByTitle = async (title) => {
  title = validation.checkTitle(title);
  const eventCollection = await events();
  const event = await eventCollection.findOne({ eventTitle: title });
  if (event === null) {
    throw new Error("No events with that title.");
  }
  event._id = event._id.toString();
  return event;
};
const getEventsByDate = async (date) => {
  date = validation.checkEventDate(date); //changed from checkDate to checkEventDate --> using ISO to verify date
  const eventCollection = await events();
  //Adding get all events on same date
  const event = await eventCollection.find({}).toArray();
  if (event === null) {
    throw new Error("No events with that date.");
  }
  date = date.split("T")[0];
  let getEventsListByDate = [];
  for (elem of event) {
    if (elem.date_created.toISOString().substring(0, 10).includes(date)) {
      elem._id = elem._id.toString();
      getEventsListByDate.push(elem);
    }
  }
  return getEventsListByDate;
};
const removeEvent = async (id) => {
  id = validation.checkObjectId(id);
  const eventCollection = await events();
  const eventObject = await getEventById(id);

  const eventName = eventObject["eventTitle"];
  const deletionInfo = await eventCollection.deleteOne({ _id: ObjectId(id) });
  if (deletionInfo.deletedCount === 0) {
    throw new Error(`Could not delete movie with id of ${id}`);
  }
  return `${eventName} has been successfully deleted!`;
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateOverallRating,
  removeEvent,
  // updateEvent,
  getEventsByDate,
  getEventsByTitle,
};
