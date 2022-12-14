const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
const user_func = require("./users")
const validation = require("../utils/validation");
// const e = require("express");

const createEvent = async(
  user_id,
event_title,
type,
organizer_name,
Description,
start_date_time,
end_date_time,
location,
tags,
pictures_allowed,
comments_allowed,
public_event,
Max_rsvps_count = 1000
) => {
  /*----------------------------------------Validation begins--------------------------------------------*/
  user_id = validation.checkObjectId(user_id);
  event_title = validation.checkNames(event_title, "event_title");
  organizer_name = validation.checkNames(organizer_name, "organizer_name");
  Description = validation.checkNames(Description, "description");
  start_date_time = validation.checkEventDate(
      start_date_time,
      "start_date_time");
  end_date_time = validation.checkEventDate(
      end_date_time, 
      "end_date_time");
  location = validation.checkAdress(location, "location");
  Max_rsvps_count = validation.checkRsvpCount(
      Max_rsvps_count,
      "Max_rsvps_count"
  );
  type = validation.checkEventType(type, "type");
  pictures_allowed = validation.checkBool(pictures_allowed, "pictures_allowed");
  comments_allowed = validation.checkBool(comments_allowed, "comments_allowed");
  public_event = validation.checkBool(public_event, "public event");
  tags = validation.checkTags(tags, "tags");
  /*----------------------------------------Validation ends--------------------------------------------*/
  const event_collection = await events();
  const newEvent = {
      _id : ObjectId(),
      user_id: ObjectId(user_id),
      event_title: event_title,
      organizer_name: organizer_name,
      Description: Description,
      start_date_time: start_date_time,
      end_date_time: end_date_time,
      location: location,
      date_created: new Date(),
      Max_rsvps_count: Max_rsvps_count,
      type: type,
      rsvps: [],
      waitlist: [],
      tags: tags,
      like_count: 0,
      Comments: [],
      reviews: [],
      overallRating : 0,
  };
  const insertInfo = await event_collection.insertOne(newEvent);
  if (insertInfo.insertedCount === 0) throw "Could not add event";
  return {Event : "Inserted Successfully."}
}

const add_guest = async (event_id, email) => {
  eventId = validation.checkObjectId(eventId);
  const user = user_func.getUserByEmail(email);
  const event_collection = await events();
  const updated_info = await event_collection.updateOne(
    {_id : ObjectId(event_id)},
    {
      $push : {waitlist : user},
    },
    {
      returnDocument : "after"
    }
  )
  if(updated_info.modifiedCount === 0){
    throw 'Could not add guest successfully';
  }
  const user_updatedInfo = await user_func.add_event(user._id.toString(), event_id);
  return await getEventById(event_id);
}

const user_rsvped = async (user_id, event_id) => {
  eventId = validation.checkObjectId(eventId);
  const event_collection = await events();
  const user = await event_collection.findOne(
    {"waitlist._id" : ObjectId(user_id)}
  );
  if(user === null) throw 'No user with given id';
  const updated_info = await event_collection.updateOne(
    {_id : ObjectId(event_id)},
    {$pull: {waitlist : {_id : ObjectId(user_id)}}},
    {$push: {rsvps : user}},
    {returnDocument : "after"}
  );
  if(updated_info.modifiedCount === 0){
    throw 'Could not add user to rsvps list.';
  }
  return await getEventById(event_id);
}

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
  removeEvent,
  // updateEvent,
  getEventsByDate,
  getEventsByTitle,
  user_rsvped,
  add_guest
};
