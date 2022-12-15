const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const events = mongoCollections.events;
const validation = require('../utils/validation');
const user = require('./users');
const createEvent = async (
  userId,
  eventTitle,
  description,
  startDateTime,
  endDateTime,
  address,
  // maxRsvpsCount,
  type,
  tags,
  event_photo_url
) => {
  userId = validation.checkObjectId(userId);
  eventTitle = validation.checkTitle(eventTitle, 'eventTitle');
  description = validation.checkNames(description, 'description');
  startDateTime = validation.checkEventDate(startDateTime, 'startDateTime');
  endDateTime = validation.checkEventDate(endDateTime, 'endDateTime');
  address = validation.checkInputString(address, 'address');
  // maxRsvpsCount = validation.checkRsvpCount(maxRsvpsCount, "maxRsvpsCount");
  type = validation.checkEventType(type, 'type');

  const event_collection = await events();
  const newEvent = {
    userId: userId,
    eventTitle: eventTitle,
    description: description,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    address: address,
    dateCreated: new Date().toISOString(),
    // maxRsvpsCount: maxRsvpsCount,
    type: type,
    rsvps: [],
    waitlist: [],
    tags: tags,
    like_count: 0,
    comments: [],
    reviews: [],
    overallRating: 0,
    event_photo_url: event_photo_url,
  };
  const insertInfo = await event_collection.insertOne(newEvent);
  if (insertInfo.insertedCount === 0) throw 'Could not add event';
  const newId = insertInfo.insertedId;
  await user.addCreatedEvent(userId, newId);
  return newId;
};

// get all upcoming events
const getAllUpcomingEvents = async () => {
  const eventCollection = await events();
  const events_list = await eventCollection
    .find({ startDateTime: { $gte: new Date() } })
    .toArray();
  if (!events_list) {
    throw new Error('Could not get all upcoming events.');
  }
  for (const element of events_list) {
    element._id = element._id.toString();
  }
  return events_list;
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
      returnDocument: 'after',
    }
  );
  if (updated_info.modifiedCount === 0) {
    throw 'Could not add guest successfully';
  }
  await add_event(user._id.toString(), eventId);
  return await getEventById(eventId);
};

const getAllEvents = async () => {
  const eventCollection = await events();
  const events_list = await eventCollection.find({}).toArray();
  if (!events_list) {
    throw new Error('Could not get all events.');
  }
  for (const element of events_list) {
    element._id = element._id.toString();
    try {
      let userData = await user.getUserById(element.userId);
      element.username = userData.username;
      element.firstName = userData.firstName;
      element.lastName = userData.lastName;
      element.profile_photo_url = userData.profile_photo_url;
    } catch (e) {
      throw e;
    }
  }
  return events_list; //changed from events to event_list
};

const getEventById = async (event_id) => {
  event_id = validation.checkObjectId(event_id);
  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: ObjectId(event_id) });
  if (event === null) throw new Error('No event with that id');
  event._id = event._id.toString();
  const userData = await user.getUserById(event.userId);
  event.username = userData.username;
  event.firstName = userData.firstName;
  event.lastName = userData.lastName;
  event.profile_photo_url = userData.profile_photo_url;
  return event;
};

const getEventsByTitle = async (title) => {
  title = validation.checkTitle(title);
  const eventCollection = await events();
  const event = await eventCollection.findOne({ eventTitle: title });
  if (event === null) {
    throw new Error('No events with that title.');
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
    throw new Error('No events with that date.');
  }
  date = date.split('T')[0];
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

  const eventName = eventObject['eventTitle'];
  const deletionInfo = await eventCollection.deleteOne({ _id: ObjectId(id) });
  if (deletionInfo.deletedCount === 0) {
    throw new Error(`Could not delete movie with id of ${id}`);
  }
  return `${eventName} has been successfully deleted!`;
};

module.exports = {
  createEvent,
  getAllUpcomingEvents,
  getAllEvents,
  getEventById,
  removeEvent,
  getEventsByDate,
  getEventsByTitle,
  add_guest,
};
