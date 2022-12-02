const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.events;
const validation = require("../utils/validation");
const { events } = require("../config/mongoCollections");

const createEvent = async (
  user_id,
  event_title,
  organizer_name,
  Description,
  start_date_time,
  end_date_time,
  address,
  Max_rsvps_count,
  type,
  tags
) => {
  user_id = validation.checkObjectId(user_id);
  console.log("Inside create event");
  event_title = validation.checkNames(event_title, "event_title");
  console.log("Validated event_title");
  organizer_name = validation.checkNames(organizer_name, "organizer_name");
  console.log("Validated organizer_name");
  Description = validation.checkNames(Description, "description");
  console.log("Validated description");
  start_date_time = validation.checkEventDate(
    start_date_time,
    "start_date_time"
  );
  console.log("Validated start date");
  end_date_time = validation.checkEventDate(end_date_time, "end_date_time");
  console.log("Validated end date");
  address = validation.checkAdress(address, "address");
  console.log("Validated address");
  Max_rsvps_count = validation.checkRsvpCount(
    Max_rsvps_count,
    "Max_rsvps_count"
  );
  console.log("MaxRsvp validates");
  type = validation.checkEventType(type, "type");
  console.log("Validated type");
  tags = validation.checkTags(tags, "tags");
  console.log("Validated tags");

  const event_collection = await events();

  const newEvent = {
    user_id: ObjectId(user_id),
    event_title: event_title,
    organizer_name: organizer_name,
    Description: Description,
    start_date_time: start_date_time,
    end_date_time: end_date_time,
    address: address,
    date_created: new Date(),
    Max_rsvps_count: Max_rsvps_count,
    type: type,
    rsvps: [],
    waitlist: [],
    tags: tags,
    like_count: "0",
    Comments: [],
    reviews: [],
  };
  const insertInfo = await event_collection.insertOne(newEvent);
  if (insertInfo.insertedCount === 0) throw "Could not add event";
  if (insertInfo) return { inserted: true };
  else return { inserted: false };

  const updateOverallRating = async (user_id) => {
    let oRating = 0;
    const event_collection = await events();
    const getReviews = await event_collection.findOne({
      _id: ObjectId(user_id),
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
};

module.exports = {
  createEvent,
};
