const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
const users = mongoCollections.users;
const validation = require("../utils/validation");

const createEvent = async (
  userId,
  eventTitle,
  organizerName,
  description,
  startDateTime,
  endDateTime,
  address,
  type,
  tags
) => {
  eventTitle = validation.checkTitle(eventTitle, "eventTitle");
  organizerName = validation.checkNames(organizerName, "organizerName");
  description = validation.checkInputString(description, "description");
  startDateTime = validation.checkEventDate(startDateTime, "startDateTime");
  endDateTime = validation.checkEventDate(endDateTime, "endDateTime");
  address = validation.checkInputString(address, "address");
  type = validation.checkEventType(type, "type");
  tags = validation.checkTags(tags, "tags");

  const event_collection = await events();
  const newEvent = {
    user_id: userId,
    eventTitle: eventTitle,
    organizerName: organizerName,
    description: description,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    address: address,
    dateCreated: new Date().toISOString(),
    type: type,
    rsvps: [],
    waitlist: [],
    tags: tags,
    like_count: 0,
    comments: [],
    ratings: [],
    overallRating: 0,
  };

  const insertInfo = await event_collection.insertOne(newEvent);
  if (insertInfo.insertedCount === 0) throw "Could not add event";
  const newId = insertInfo.insertedId.toString();
  await user_create_event(userId, newId);
  return newId;
};

const user_create_event = async(userId, eventId) =>{
  const user_collection = await users();
  const event = await getEventById_Object(eventId);
  const updated_info = await user_collection.updateOne(
    {_id : ObjectId(userId)},
    {$push : {events_created : event}},
    {returnDocument: "after"}
  );
  if(updated_info.modifiedCount === 0){
    throw 'Could not add created event to user successfully';
  }
  return {Event : "added to user successfully."};
}

const add_event = async (userId, eventId) => {
  const user_collection = await users();
  const event = await getEventById_Object(eventId);
  const updated_info = await user_collection.updateOne(
    { _id: ObjectId(userId) },
    { $push: { invited_events: event } },
    { returnDocument: "after" }
  );
  if (updated_info.modifiedCount === 0) {
    throw "Could not add invited event to user successfully";
  }
  return { Event: "added event successfully" };
};

const add_guest = async (eventId, email) => {
  eventId = validation.checkObjectId(eventId);
  const user = await getUserByEmail(email);
  const event_collection = await events();
  const updated_info = await event_collection.updateOne(
    { _id: ObjectId(eventId) },
    {
      $push: { waitlist: user },
    },
    {
      returnDocument: "after",
    }
  );
  if (updated_info.modifiedCount === 0) {
    throw "Could not add guest successfully";
  }
  await add_event(user._id.toString(), eventId);
  return await getEventById(eventId);
};

const add_guests = async (eventId, arr) =>{
  eventId = validation.checkObjectId(eventId);
  for(const element of arr){
    await add_guest(eventId, element);
  }
  return {Add_guest : "added guests successfully."};
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
  event_id = validation.checkObjectId(event_id);
  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: ObjectId(event_id) });
  if (event === null) throw new Error("No event with that id");
  event._id = event._id.toString();
  return event;
};

const getEventById_Object = async (event_id) => {
  event_id = validation.checkObjectId(event_id);
  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: ObjectId(event_id) });
  if (event === null) throw new Error("No event with that id");
  return event;
};

const getUserByEmail = async (email) => {
  email = validation.checkEmail(email);
  const user_collection = await users();
  const user = await user_collection.findOne({ email });
  if (!user) throw 'User not found';
  user._id = user._id;
  return user;
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

const addRating = async (event_id, user_id, rating) => {
  event_id = validation.checkObjectId(event_id);
  rating = validation.checkRating(rating);
  const eventCollection = await events();
  const ratingObj = {
    _id: ObjectId(),
    user_id,
    rating,
  };

  const updatedInfo = await eventCollection.updateOne(
    { _id: ObjectId(event_id) },
    { $push: { ratings: ratingObj } },
    {returnDocument : "after"}
  );
  let orating = await updateOverallRating(event_id);

  if (updatedInfo.modifiedCount === 0) {
    throw "could not update event successfully";
  }

  const event = await eventCollection.findOne({
    _id: ObjectId(event_id),
  });
  return event;
};

const updateOverallRating = async (eventId) => {
  let oRating = 0;
  const eventCollection = await events();
  const { ratings } = await eventCollection.findOne({ _id: ObjectId(eventId) });
  if (ratings.length !== 0) {
    for (rating of ratings) {
      oRating += rating.rating;
    }
    oRating = (oRating / ratings.length).toFixed(1);
  }
  const ratingAdd = await eventCollection.updateOne(
    {
      _id: ObjectId(eventId),
    },
    { $set: { overallRating: Number(oRating) } }
  );
  let eventList = getEventById(eventId);
  return eventList;
};

const updateRating = async (event_id, user_id, rating, rating_id) => {
  event_id = validation.checkObjectId(event_id);
  rating = validation.checkRating(rating);
  const eventCollection = await events();
  const { ratings } = await eventCollection.findOne({
    ratings: { $elemMatch: { user_id: user_id } },
  });

  for (rate of ratings) {
    if (rate.user_id === user_id) {
      break;
    }
  }
  ratings[ratings.indexOf(rate)]["rating"] = rating;

  const updatedInfo = await eventCollection.updateOne(
    {
      "ratings._id": rating_id,
    },
    {
      $set: {
        ratings: ratings,
      },
    }
  );
  const oRating = await updateOverallRating(event_id);

  if (!updatedInfo.acknowledged) {
    throw "could not update event successfully";
  }
  const event = await eventCollection.findOne({
    _id: ObjectId(event_id),
  });
  return event;
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  removeEvent,
  getEventsByDate,
  getEventsByTitle,
  add_guest,
  add_guests,
  addRating,
  updateRating,
};
