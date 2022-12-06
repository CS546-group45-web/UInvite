const mongoCollections = require('../config/mongoCollections');
const events = mongoCollections.events;
const {ObjectId} = require('mongodb');
const validation = require('../utils/validation');

const createComment = async (
    eventId,
    CommenterName,
    Comment,
    rating
  ) => {
    //----------------------------validation--------------------------------------
    eventId = validation.checkObjectId(eventId);
    CommentTitle = validation.checkInputString(CommentTitle);
    CommenterName = validation.checkInputString(CommenterName);
    Comment = validation.checkInputString(Comment);
    CommenterName = validation.checkNames(CommenterName, "Full Name");
    //----------------------------validation ends---------------------------------
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
  
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
  
    const formattedToday = mm + '/' + dd + '/' + yyyy;
    const new_Comment = {
      _id : ObjectId(),
      CommentTitle : CommentTitle,
      CommentDate : formattedToday,
      CommenterName : CommenterName,
      Comment : Comment,
      rating : rating
    }
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id: ObjectId(eventId)});
    const updatedInfo = await eventCollection.updateOne(
      {_id : ObjectId(eventId)},
      {
        $push : {Comments : new_Comment}
      },
      {
        returnDocument : "after"
      }
    )
    if (updatedInfo.modifiedCount === 0 || updatedInfo.matchedCount === 0) {
      throw new Error('could not update event successfully');
    }
    new_Comment._id = new_Comment._id.toString();
    return new_Comment;
  };
  
  const getAllComments = async (eventId) => {
    //----------------------------validation--------------------------------------
    eventId = validation.checkObjectId(eventId);
    if(!ObjectId.isValid(eventId)){ throw new Error("event id is not a valid ObjectID."); } //test valid objectid
    //----------------------------validation ends---------------------------------
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id : ObjectId(eventId)});
    if(event === null) throw new Error("Could not get Comments for this eventId.");
    return event.Comments;
  };
  
  const getComment = async (CommentId) => {
    CommentId = validation.checkId(CommentId);
    const eventCollection = await events();
    const event = await eventCollection.findOne({"Comments._id" : ObjectId(CommentId)});
    if(event === null) throw new Error("No Comments with given Comment ID.");
    const Comments = event.Comments;
    for(const rev of Comments){
      if(CommentId === rev._id.toString()){
        const Comment = rev;
        Comment._id = rev._id.toString();
        return Comment;
      }
    }
  };
  
  const removeComment = async (CommentId) => {
    CommentId = validation.checkObjectId(CommentId);
    const eventCollection = await events();
    const event = await eventCollection.findOne({"Comments._id" : ObjectId(CommentId)});
    const Comment = await getComment(CommentId);
    const updated_event = await eventCollection.findOneAndUpdate(
      { _id : event._id },
      {
        $pull : {Comments : { _id : ObjectId(CommentId) }}
      }
      );
    if(updated_event.modifiedCount === 0) throw new Error("Cannot remove Comment");
    const event_after = await eventCollection.findOne({_id : event._id});
    return event_after;
  };
  
  module.exports = {
    createComment,
    getAllComments,
    getComment,
    removeComment
  };
  