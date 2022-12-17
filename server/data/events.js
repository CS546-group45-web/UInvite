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
  type,
  tags,
  arePicturesAllowed,
  areCommentsAllowed,
  ageRestricted
) => {
  userId = validation.checkObjectId(userId);
  eventTitle = validation.checkTitle(eventTitle, 'eventTitle');
  description = validation.checkInputString(description, 'description');
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
    arePicturesAllowed: arePicturesAllowed && true,
    areCommentsAllowed: areCommentsAllowed && true,
    ageRestricted: ageRestricted && true,
    type: type,
    rsvps: [],
    waitlist: [],
    tags: tags,
    like_count: 0,
    comments: [],
    reviews: [],
    overallRating: 0,
  };
  const insertInfo = await event_collection.insertOne(newEvent);
  if (insertInfo.insertedCount === 0) throw 'Could not add event';
  const newId = insertInfo.insertedId.toString();
  try {
    const userData = await user.addCreatedEvent(userId, newId);
  } catch (e) {
    throw e;
  }
  return newId;
};

const updateEvent = async (
  eventId,
  userId,
  eventTitle,
  description,
  startDateTime,
  endDateTime,
  address,
  type,
  tags,
  arePicturesAllowed,
  areCommentsAllowed,
  ageRestricted
) => {
  eventId = validation.checkObjectId(eventId);
  userId = validation.checkObjectId(userId);
  eventTitle = validation.checkTitle(eventTitle, 'eventTitle');
  description = validation.checkInputString(description, 'description');
  startDateTime = validation.checkEventDate(startDateTime, 'startDateTime');
  endDateTime = validation.checkEventDate(endDateTime, 'endDateTime');
  address = validation.checkInputString(address, 'address');
  type = validation.checkEventType(type, 'type');

  const updatedEvent = {
    userId: userId,
    eventTitle: eventTitle,
    description: description,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    address: address,
    dateCreated: new Date().toISOString(),
    arePicturesAllowed: arePicturesAllowed && true,
    areCommentsAllowed: areCommentsAllowed && true,
    ageRestricted: ageRestricted && true,
    type: type,
  };
  const eventCollection = await events();
  const updatedInfo = await eventCollection.updateOne(
    { _id: ObjectId(eventId) },
    { $set: updatedEvent }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw 'Could not update event';
  }
  return await getEventById(eventId);
};

// updateEventPhoto
const updateEventPhoto = async (eventId, userId, event_photo_url) => {
  eventId = validation.checkObjectId(eventId);
  userId = validation.checkObjectId(userId);
  const eventCollection = await events();
  const updatedEvent = await eventCollection.updateOne(
    { _id: ObjectId(eventId) },
    { $set: { event_photo_url: event_photo_url } }
  );
  if (updatedEvent.modifiedCount === 0) {
    throw 'Could not update event photo';
  }
  return await getEventById(eventId);
};

// get all upcoming events
const getAllUpcomingEvents = async () => {
  const eventCollection = await events();
  //  dateCreated: new Date().toISOString(),
  const events_list = await eventCollection
    .find({ startDateTime: { $gte: new Date().toISOString() } })
    .toArray();
  if (!events_list) {
    throw new Error('Could not get all events.');
  }
  for (const element of events_list) {
    element._id = element._id.toString();
    try {
      let userData = await user.getUserById(element?.userId.toString());
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

const getAllEvents = async () => {
  const eventCollection = await events();
  const events_list = await eventCollection.find({}).toArray();
  if (!events_list) {
    throw new Error('Could not get all events.');
  }
  for (const element of events_list) {
    element._id = element._id.toString();
    try {
      let userData = await user.getUserById(element?.userId.toString());
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
  if (!event) throw 'No event with that id';
  event._id = event._id.toString();
  const userData = await user.getUserById(event.userId);
  event.username = userData.username;
  event.firstName = userData.firstName;
  event.lastName = userData.lastName;
  event.profile_photo_url = userData.profile_photo_url;
  return event;
};

const getEventMinById = async (event_id) => {
  event_id = validation.checkObjectId(event_id);
  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: ObjectId(event_id) });
  if (!event) throw 'Event not found';
  event._id = event._id.toString();
  // only neeed eventTitle, dateCreated, rsvps, tags
  const eventMin = {
    _id: event._id,
    eventTitle: event.eventTitle,
    dateCreated: event.dateCreated,
    rsvps: event.rsvps,
    tags: event.tags,
    address: event.address,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    dateCreated: event.dateCreated,
  };
  return eventMin;
};

const getCreatedEvents = async (userId) => {
  const userData = await user.getUserById(userId);
  if (!userData) throw 'User not found';
  const eventsCreated = [];
  for (let i = 0; i < userData?.eventsCreated.length; i++) {
    try {
      let eventData = await getEventMinById(
        userData?.eventsCreated[i].toString()
      );
      eventsCreated.push(eventData);
    } catch (e) {
      throw e;
    }
  }
  return eventsCreated;
};

//  get user invites
const getInvites = async (userId) => {
  const userData = await user.getUserById(userId);
  if (!userData) throw 'User not found';
  const invites = [];
  for (let i = 0; i < userData?.invited_events.length; i++) {
    try {
      let eventData = await getEventMinById(
        userData?.invited_events[i].toString()
      );
      invites.push(eventData);
    } catch (e) {
      throw e;
    }
  }
  return invites;
};

// rsvp to event
const rsvp = async (eventId, userId) => {
  eventId = validation.checkObjectId(eventId);
  const event_collection = await events();
  const updated_info = await event_collection.updateOne(
    { _id: ObjectId(eventId) },
    {
      $addToSet: { rsvps: userId },
    }
  );
  if (updated_info.modifiedCount === 0) {
    throw 'Could not rsvp to event';
  }
  await user.addrsvpEvent(userId, eventId);
  return await getEventById(eventId);
};

// getRsvpEvents
const getRsvpEvents = async (userId) => {
  const userData = await user.getUserById(userId);
  if (!userData) throw 'User not found';
  const eventsRsvp = [];
  for (let i = 0; i < userData?.rsvped_events.length; i++) {
    try {
      let eventData = await getEventMinById(
        userData?.rsvped_events[i].toString()
      );
      eventsRsvp.push(eventData);
    } catch (e) {
      throw e;
    }
  }
  return eventsRsvp;
};

const getRsvpList = async (eventId) => {
  eventId = validation.checkObjectId(eventId);
  const event = await getEventById(eventId);
  if (!event) throw 'Event not found';
  const rsvpList = [];
  for (let i = 0; i < event?.rsvps.length; i++) {
    try {
      let userData = await user.getUserById(event?.rsvps[i].toString());
      minUserData = {
        userId: userData._id,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profile_photo_url: userData.profile_photo_url,
      };
      rsvpList.push(minUserData);
    } catch (e) {
      throw e;
    }
  }
  return rsvpList;
};

// getEventsBySearch
const getEventsBySearch = async (
  eventTitle,
  dateCreated,
  eventLocation,
  eventTags,
  eventRating,
  eventStartDateTime,
  eventEndDateTime
) => {
  if (!eventTitle && !eventDate && !eventLocation && !eventTags) {
    throw 'Please enter at least one search parameter';
  }
  const eventCollection = await events();
  let events_list = await eventCollection.find({}).toArray();
  if (!events_list) {
    throw new Error('Could not get all events.');
  }
  for (const element of events_list) {
    element._id = element._id.toString();
    try {
      let userData = await user.getUserById(element?.userId.toString());
      element.username = userData.username;
      element.firstName = userData.firstName;
      element.lastName = userData.lastName;
      element.profile_photo_url = userData.profile_photo_url;
    } catch (e) {
      throw e;
    }
  }
  if (eventTitle) {
    events_list = events_list.filter((event) => {
      return event.eventTitle.toLowerCase().includes(eventTitle.toLowerCase());
    });
  }

  if (dateCreated) {
    const date = new Date(dateCreated);
    events_list = events_list.filter((event) => {
      const eventDate = new Date(event.dateCreated);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  }

  if (eventLocation) {
    events_list = events_list.filter((event) => {
      return event.address.toLowerCase().includes(eventLocation.toLowerCase());
    });
  }

  if (eventTags) {
    events_list = events_list.filter((event) => {
      // event.tags is an array of strings
      for (let i = 0; i < event.tags.length; i++) {
        if (event.tags[i].toLowerCase().includes(eventTags.toLowerCase())) {
          return true;
        }
      }
    });
  }

  if (eventRating) {
    events_list = events_list.filter((event) => {
      return event.overallRating >= eventRating;
    });
  }

  if (eventStartDateTime) {
    const date = new Date(eventStartDateTime);
    events_list = events_list.filter((event) => {
      const eventDate = new Date(event.eventStartDateTime);
      return (
        eventDate.getFullYear() >= date.getFullYear() &&
        eventDate.getMonth() >= date.getMonth() &&
        eventDate.getDate() >= date.getDate()
      );
    });
    return events_list;
  }
  if (eventEndDateTime) {
    const date = new Date(eventEndDateTime);
    events_list = events_list.filter((event) => {
      const eventDate = new Date(event.eventEndDateTime);
      return (
        eventDate.getFullYear() <= date.getFullYear() &&
        eventDate.getMonth() <= date.getMonth() &&
        eventDate.getDate() <= date.getDate()
      );
    });
  }
  return events_list;
};

const addEventPhoto = async (eventId, userId, photo) => {
  eventId = validation.checkObjectId(eventId);
  const eventCollection = await events();
  const event = await getEventById(eventId);
  if (!event) throw 'Event not found';
  // update to event_photos array
  const updatedEvent = await eventCollection.updateOne(
    { _id: ObjectId(eventId) },
    { $push: { event_photos: photo } }
  );
  if (updatedEvent.modifiedCount === 0) {
    throw 'Could not add photo to event.';
  }
  return await getEventById(eventId);
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
  updateEventPhoto,
  getAllUpcomingEvents,
  getAllEvents,
  getEventById,
  getRsvpEvents,
  getEventMinById,
  removeEvent,
  getEventsByDate,
  getEventsByTitle,
  rsvp,
  getCreatedEvents,
  updateEvent,
  getInvites,
  getEventsBySearch,
  getRsvpList,
  addEventPhoto,
};
