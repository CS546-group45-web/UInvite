const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
const validation = require("../utils/validation");

const createEvent = async(
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
  event_title = validation.checkNames(event_title, "event_title");
  organizer_name = validation.checkNames(organizer_name, "organizer_name");
  Description = validation.checkNames(Description, "description");
  start_date_time = validation.checkEventDate(
    start_date_time,
    "start_date_time"
  );
  end_date_time = validation.checkEventDate(end_date_time, "end_date_time");
  address = validation.checkAdress(address, "address");
  Max_rsvps_count = validation.checkRsvpCount(
    Max_rsvps_count,
    "Max_rsvps_count"
  );
  type = validation.checkEventType(type, "type");
  tags = validation.checkTags(tags, "tags");

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
    like_count: 0,
    Comments: [],
    reviews: [],
    overallRating : 0,
  };
  const insertInfo = await event_collection.insertOne(newEvent);
  if (insertInfo.insertedCount === 0) throw "Could not add event";
  return {Event : "Inserted Successfully."}
}


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

module.exports = {
  createEvent,
};
