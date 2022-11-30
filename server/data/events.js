const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const events = mongoCollections.events;
const validation = require('../utils/validation');

const createEvent = (
    title,
    settings
) => {

}

const getAllEvents = () => {

}

const getEventById = (id) =>{

}

const removeEvent = (id) =>{

}

const updateEvent = (
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
    updateEvent
  };