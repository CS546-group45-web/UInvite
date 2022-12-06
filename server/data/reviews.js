const mongoCollections = require('../config/mongoCollections');
const events = mongoCollections.events;
const {ObjectId} = require('mongodb');
const validation = require('../utils/validation');

const createReview = async (
  eventId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  //----------------------------validation--------------------------------------
  eventId = validation.checkObjectId(eventId);
  reviewTitle = validation.checkInputString(reviewTitle);
  reviewerName = validation.checkNames(reviewerName, "Full Name");
  if(!(/^([1-5]|[1-4].[0-9])$/gm.test(rating))){ throw new Error("Invalid Rating."); } // test valid rating
  //----------------------------validation ends---------------------------------
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = mm + '/' + dd + '/' + yyyy;
  const new_review = {
    _id : ObjectId(),
    reviewTitle : reviewTitle,
    reviewDate : formattedToday,
    reviewerName : reviewerName,
    review : review,
    rating : rating
  }
  const eventCollection = await events();
  const event = await eventCollection.findOne({_id: ObjectId(eventId)});
  const overall_rating = Math.round((event.overallRating*event.reviews.length+rating)/(event.reviews.length+1)*10)/10;
  const updatedInfo = await eventCollection.updateOne(
    {_id : ObjectId(eventId)},
    {
      $push : {reviews : new_review},
      $set : {overallRating : overall_rating}
    },
    {
      returnDocument : "after"
    }
  )
  if (updatedInfo.modifiedCount === 0 || updatedInfo.matchedCount === 0) {
    throw new Error('could not update event successfully');
  }
  new_review._id = new_review._id.toString();
  return new_review;
};

const getAllReviews = async (eventId) => {
  //----------------------------validation--------------------------------------
  eventId = validation.checkObjectId(eventId);
  if(!ObjectId.isValid(eventId)){ throw new Error("event id is not a valid ObjectID."); } //test valid objectid
  //----------------------------validation ends---------------------------------
  const eventCollection = await events();
  const event = await eventCollection.findOne({_id : ObjectId(eventId)});
  if(event === null) throw new Error("Could not get reviews for this eventId.");
  return event.reviews;
};

const getReview = async (reviewId) => {
  reviewId = validation.checkObjectId(reviewId);
  const eventCollection = await events();
  const event = await eventCollection.findOne({"reviews._id" : ObjectId(reviewId)});
  if(event === null) throw new Error("No reviews with given review ID.");
  const reviews = event.reviews;
  for(const rev of reviews){
    if(reviewId === rev._id.toString()){
      const review = rev;
      review._id = rev._id.toString();
      return review;
    }
  }
};

const removeReview = async (reviewId) => {
  reviewId = validation.checkObjectId(reviewId);
  const eventCollection = await events();
  const event = await eventCollection.findOne({"reviews._id" : ObjectId(reviewId)});
  const review = await getReview(reviewId);
  let new_rating = Math.round(((event.overallRating*event.reviews.length)-review.rating)/(event.reviews.length-1)*10)/10;
  if(event.reviews.length === 1 ){
    new_rating = 0;
  }
  const updated_event = await eventCollection.findOneAndUpdate(
    { _id : event._id },
    {
      $set : {overallRating : new_rating},
      $pull : {reviews : { _id : ObjectId(reviewId) }}
    }
    );
  if(updated_event.modifiedCount === 0) throw new Error("Cannot remove review");
  const event_after = await eventCollection.findOne({_id : event._id});
  return event_after;
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
