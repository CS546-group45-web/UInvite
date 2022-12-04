const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const events = mongoCollections.events;
const validation = require('../utils/validation');

const createEvent = async(
    event_name,
    location,
    date,
    time,
    age,
    pic_permit,
    comt_permit,
    public_event,
) => {

}

const getAllEvents = async () => {
    const eventCollection = await events();
    const events_list = await eventCollection.find({}).toArray();
    if(!events_list){
        throw new Error("Could not get all events.");
    }
    for(const element of events_list){
        element._id = element._id.toString();
    }
    return events;
}

const getEventById = async(event_id) =>{
    event_id = validation.checkId(event_id);
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id: ObjectId(event_id)});
    if (event === null) throw new Error('No event with that id');
    event._id = event._id.toString();
    return event;
}

const getEventsByTitle = async(title) => {
    title = validation.checkTitle(title);
    const eventCollection = await events();
    const event = await eventCollection.findOne({title:title});
    if(event === null){
        throw new Error('No events with that title.');
    }
    event._id = event._id.toString();
    return event;
}

const getEventsByDate = async(date) => {
    date = validation.checkDate(date);
    const eventCollection = await events();
    const event = await eventCollection.findOne({date:date});
    if(event === null){
        throw new Error('No events with that date.');
    }
    event._id = event._id.toString();
    return event;
}

const removeEvent = async(id) =>{
    id = validation.checkObjectId(id);
    const eventCollection = await events();
    const event_object = await getEventById(id);
    const event_name = event_object["title"];
    const deletionInfo = await eventCollection.deleteOne({_id: ObjectId(id)});

    if (deletionInfo.deletedCount === 0) {
      throw new Error(`Could not delete movie with id of ${id}`);
    }
    return `${event_name} has been successfully deleted!`;
}

const updateEvent = async(
    id,
    title,
    settings
) =>{
    
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    removeEvent,
    updateEvent,
    getEventsByDate,
    getEventsByTitle,
  };