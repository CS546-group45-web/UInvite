const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const events = mongoCollections.events;
const validation = require('../utils/validation');
const user = require('./users');
const calendarEvents = require('../calendar/calendarEvents');
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
  type = validation.checkEventType(type, 'type');

  if (type.toLowerCase() === 'in-person') {
    address = validation.checkInputString(address, 'address');
  }

  if (type.toLowerCase() === 'online') {
    address = validation.checkEventURl(address, 'onlineEventLink');
  }

  const event_collection = await events();

  let newEvent = {
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
    ratings: [],
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
    event_photo_url: event.event_photo_url,
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
  // check if user is invited
  let userData = await user.getUserById(userId);
  if (userData.invited_events && userData.invited_events.includes(eventId)) {
    await user.removeInvite(userId, eventId);
  }
  if (userData.googleConnected) {
    // if user has google connected
    const event = await getEventById(eventId);
    // createCalendarEvent if user has calendar
    const calendarEvent = {
      summary: event.eventTitle,
      location: event.address,
      description: event.description,
      start: {
        dateTime: event.startDateTime,
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: event.endDateTime,
        timeZone: 'America/New_York',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };
    // calendarEvents
    try {
      const calenderData = await calendarEvents.createCalendarEvent(
        userData,
        calendarEvent
      );
      // update event with calendar event id
      const calendarUpdate = await event_collection.updateOne(
        { _id: ObjectId(eventId) },
        {
          $set: { calendarEventId: calenderData.id },
        }
      );
      if (calendarUpdate.modifiedCount === 0) {
        throw 'Could not update event with calendar event id';
      }
      return await getEventById(eventId);
    } catch (e) {
      throw e;
    }
  } else {
    return await getEventById(eventId);
  }
};

// remove rsvp
const removeRsvp = async (eventId, userId) => {
  eventId = validation.checkObjectId(eventId);
  const event_collection = await events();
  const updated_info = await event_collection.updateOne(
    { _id: ObjectId(eventId) },
    {
      $pull: { rsvps: userId },
    }
  );
  if (updated_info.modifiedCount === 0) {
    throw 'Could not remove rsvp';
  }
  await user.removeRsvpEvent(userId, eventId);
  // remove calendar event if user has googleConnected
  let userData = await user.getUserById(userId);
  if (userData.googleConnected) {
    const eventData = await getEventById(eventId);
    if (eventData.calendarEventId) {
      try {
        await calendarEvents.deleteCalendarEvent(
          userData,
          eventData.calendarEventId
        );
      } catch (e) {
        return await eventData;
      }
    }
  }
  return await eventData;
};

// getRsvpEvents
const getRsvpEvents = async (userId) => {
  const userData = await user.getUserById(userId);
  if (!userData) throw 'User not found';
  const eventsRsvp = [];
  for (let i = 0; i < userData?.rsvped_events.length; i++) {
    try {
      let eventData = await getEventById(userData?.rsvped_events[i].toString());
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
  eventLocation,
  eventTags,
  eventRating,
  eventStartDateTime,
  eventEndDateTime,
  sortType
) => {
  if (!eventTitle && !eventLocation && !eventTags) {
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

  if (eventLocation) {
    events_list = events_list.filter((event) => {
      return event.address.toLowerCase().includes(eventLocation.toLowerCase());
    });
  }

  if (eventTags) {
    eventTags = validation.checkTags(eventTags);
    events_list = events_list.filter((event) => {
      // event.tags is an array of strings
      // for each tag in the eventTags array, check if it is in the event.tags array
      for (let i = 0; i < eventTags.length; i++) {
        for (let j = 0; j < event.tags.length; j++) {
          if (eventTags[i].toLowerCase() === event.tags[j].toLowerCase()) {
            return true;
          }
        }
      }
    });
  }

  if (eventRating) {
    events_list = events_list.filter((event) => {
      return event.overallRating >= eventRating;
    });
  }

  if (sortType) {
    if (sortType === 'rating') {
      return events_list.sort((a, b) => b.overallRating - a.overallRating);
    }

    if (sortType === 'startDateAsc') {
      let dateList = await getAllUpcomingEvents();

      return dateList.sort((a, b) => a.startDateTime - b.startDateTime);
    }

    if (sortType === 'startDateDesc') {
      let dateList = await getAllUpcomingEvents();

      return dateList.sort((a, b) => b.startDateTime - a.startDateTime);
    }
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

const getBookmarks = async (userId) => {
  userId = validation.checkObjectId(userId);
  const userData = await user.getUserById(userId);
  if (!userData) throw 'User not found';
  const bookmarks = userData.bookmarks;
  const events = [];
  for (let i = 0; i < bookmarks.length; i++) {
    const event = await getEventMinById(bookmarks[i]);
    events.push(event);
  }
  return events;
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
  const event = await getAllEvents();
  if (event === null) {
    throw new Error('No events');
  }
  date = date.split('T')[0];
  let getEventsListByDate = [];
  for (elem of event) {
    if (elem.date_created.toISOString().substring(0, 10).includes(date)) {
      elem._id = elem._id.toString();
      getEventsListByDate.push(elem);
    } else {
      throw 'No event by that date';
    }
  }
  return getEventsListByDate;
};
const removeEvent = async (id) => {
  id = validation.checkObjectId(id);
  const eventCollection = await events();
  const eventObject = await getEventById(id);
  const eventName = eventObject['eventTitle'];
  let rsvp = await user.updateRsvpDeleteEvent(id);
  let bookmark = await user.updateBookmarkDeleteEvent(id);
  let invite = await user.updateInviteDeleteEvent(id);
  let userEvent = await user.updateUserDeleteEvent(id);

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
    { $push: { ratings: ratingObj } }
  );
  let orating = await updateOverallRating(event_id);

  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update event successfully';
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
  ratings[ratings.indexOf(rate)]['rating'] = rating;

  const updatedInfo = await eventCollection.updateOne(
    {
      'ratings._id': rating_id,
    },
    {
      $set: {
        ratings: ratings,
      },
    }
  );
  const oRating = await updateOverallRating(event_id);

  if (!updatedInfo.acknowledged) {
    throw 'could not update event successfully';
  }
  const event = await eventCollection.findOne({
    _id: ObjectId(event_id),
  });
  return event;
};

const getRatingIfExists = async (eventId, userId, rating) => {
  let event = await getEventById(eventId);

  if (!event['ratings']) {
    data = await addRating(eventId, userId, rating);
  } else {
    let rating_id = null;
    const { ratings } = event;

    for (rate of ratings) {
      if (rate['user_id'] === userId) {
        rating_id = rate['_id'];
        break;
      }
    }

    if (rating_id !== null) {
      data = await updateRating(eventId, userId, rating, rating_id);
    } else {
      data = await addRating(eventId, userId, rating);
    }
  }
  return data;
};

const getAllTags = async () => {
  const eventCollection = await events();
  const events_list = await eventCollection.find({}).toArray();
  if (!events_list) {
    throw new Error('Could not get all events.');
  }
  let tagList = [];
  for (elem of events_list) {
    for (tag of elem.tags) {
      if (tagList.indexOf(tag.toLowerCase()) === -1) {
        tagList.push(tag.toLowerCase());
      }
    }
  }
  return tagList;
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
  getRatingIfExists,
  getEventsBySearch,
  getRsvpList,
  addEventPhoto,
  getBookmarks,
  removeRsvp,
  getAllTags,
};
