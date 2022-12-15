const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const eventData = data.events;
const validation = require('../utils/validation');
const passport = require('passport');

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let {
      eventTitle,
      description,
      startDateTime,
      endDateTime,
      address,
      // maxRsvpsCount,
      type,
      tags,
    } = req.body;
    let userId = req.user._id;
    try {
      userId = validation.checkObjectId(userId);
      eventTitle = validation.checkTitle(eventTitle, 'eventTitle');
      description = validation.checkNames(description, 'description');
      startDateTime = validation.checkEventDate(startDateTime, 'startDateTime');
      endDateTime = validation.checkEventDate(endDateTime, 'endDateTime');
      address = validation.checkInputString(address, 'address');
      // maxRsvpsCount = validation.checkRsvpCount(maxRsvpsCount, 'maxRsvpsCount');
      type = validation.checkEventType(type, 'type');
      tags = validation.checkTags(tags, 'tags');
    } catch (e) {
      if (typeof e === 'string') return res.status(400).json({ error: e });
      else
        return res
          .status(400)
          .json({ error: 'The event is missing a  parameter, try again!' });
    }
    try {
      let eventCreated = await eventData.createEvent(
        userId,
        eventTitle,
        description,
        startDateTime,
        endDateTime,
        address,
        // maxRsvpsCount,
        type,
        tags
      );
      return res.status(200).json({
        message: 'Event added successfully',
        data: { eventId: eventCreated },
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .get(async (req, res) => {
    const event = await eventData.getAllEvents();
    return res.json({ message: 'events fetched', data: event });
  });

router
  .route('/id/:eventId')
  .get(async (req, res) => {
    let eventId = req.params.eventId;
    try {
      eventId = validation.checkObjectId(eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const event = await eventData.getEventById(eventId);
      return res.json({
        message: 'event fetched',
        data: event,
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    let eventId = req.params.eventId;
    try {
      eventId = validation.checkObjectId(eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const deletedEventId = await eventData.removeEvent(eventId);
      return res.status(200).json({ message: deletedEventId });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// get all upcoming events
router.route('/upcoming').get(async (req, res) => {
  try {
    const events = await eventData.getAllUpcomingEvents();
    return res.json({ message: 'events fetched', data: events });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.route('/title/:eventTitle').get(async (req, res) => {
  let eventTitle = req.params.eventTitle;
  console.log(eventTitle);
  try {
    title = validation.checkTitle(eventTitle);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const event = await eventData.getEventsByTitle(eventTitle);
    console.log(event);
    return res.json({ EventList: event });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.route('/date/:eventDate').get(async (req, res) => {
  let eventDate = req.params.eventDate;
  try {
    title = validation.checkEventDate(eventDate);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const event = await eventData.getEventsByDate(eventDate);
    console.log(event);
    return res.json({ EventList: event });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
