const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const events = mongoCollections.events;
const validation = require('../utils/validation');

const createEvent = (
    title,
    settings,
    people
) => {

}

const getAllEvents = () => {

}

const getEventById = (id) =>{

}

const getEventsByUser = (username) => {

}

const getEventsByDate = (date) => {

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