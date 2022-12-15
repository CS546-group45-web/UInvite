const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validation = require("../utils/validation");

const createComment = async (eventId, userId, comment) => {
  //----------------------------validation--------------------------------------
  eventId = validation.checkObjectId(eventId);
  // userId = validation.checkObjectId(userId);
  comment = validation.checkInputString(comment);
  //----------------------------validation ends---------------------------------
  const today = new Date().toISOString();
  const userCollection = await users();
  const userData = await userCollection.findOne({ _id: ObjectId(userId) });
  let { firstName, lastName, username, profile_photo_url } = userData;
  const newComment = {
    _id: ObjectId(),
    user_id: userId,
    dateCreated: today,
    name: firstName + " " + lastName,
    username: username,
    profile_photo_url: profile_photo_url,
    comment: comment,
  };
  const eventCollection = await events();
  const updatedInfo = await eventCollection.updateOne(
    { _id: ObjectId(eventId) },
    {
      $push: { comments: newComment },
    },
    {
      returnDocument: "after",
    }
  );
  if (updatedInfo.modifiedCount === 0 || updatedInfo.matchedCount === 0) {
    throw new Error("could not update event successfully");
  }
  return newComment;
};

const getAllComments = async (eventId) => {
  //----------------------------validation--------------------------------------
  eventId = validation.checkObjectId(eventId);
  if (!ObjectId.isValid(eventId)) {
    throw new Error("event id is not a valid ObjectID.");
  } //test valid objectid
  //----------------------------validation ends---------------------------------
  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: ObjectId(eventId) });
  if (event === null)
    throw new Error("Could not get Comments for this eventId.");
  return event.Comments;
};

const getComment = async (CommentId) => {
  CommentId = validation.checkId(CommentId);
  const eventCollection = await events();
  const event = await eventCollection.findOne({
    "Comments._id": ObjectId(CommentId),
  });
  if (event === null) throw new Error("No Comments with given Comment ID.");
  const Comments = event.Comments;
  for (const rev of Comments) {
    if (CommentId === rev._id.toString()) {
      const Comment = rev;
      Comment._id = rev._id.toString();
      return Comment;
    }
  }
};

const removeComment = async (CommentId) => {
  CommentId = validation.checkObjectId(CommentId);
  const eventCollection = await events();
  const event = await eventCollection.findOne({
    "Comments._id": ObjectId(CommentId),
  });
  const Comment = await getComment(CommentId);
  const updated_event = await eventCollection.findOneAndUpdate(
    { _id: event._id },
    {
      $pull: { Comments: { _id: ObjectId(CommentId) } },
    }
  );
  if (updated_event.modifiedCount === 0)
    throw new Error("Cannot remove Comment");
  const event_after = await eventCollection.findOne({ _id: event._id });
  return event_after;
};

module.exports = {
  createComment,
  getAllComments,
  getComment,
  removeComment,
};
