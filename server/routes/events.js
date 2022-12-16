const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const eventData = data.events;
const comments = data.comments;
const validation = require('../utils/validation');
const passport = require('passport');
const upload = require('../utils/uploadImage');

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let {
      eventTitle,
      description,
      startDateTime,
      endDateTime,
      address,
      type,
      tags,
      invites,
      arePicturesAllowed,
      areCommentsAllowed,
      ageRestricted,
    } = req.body;
    let userId = req.user._id;
    try {
      userId = validation.checkObjectId(userId);
      eventTitle = validation.checkTitle(eventTitle, 'eventTitle');
      description = validation.checkInputString(description, 'description');
      startDateTime = validation.checkEventDate(startDateTime, 'startDateTime');
      endDateTime = validation.checkEventDate(endDateTime, 'endDateTime');
      address = validation.checkInputString(address, 'address');
      type = validation.checkEventType(type, 'type');
      tags = validation.checkTags(tags, 'tags');
      invites = validation.checkInvites(invites, 'invites');
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
        type,
        tags,
        arePicturesAllowed,
        areCommentsAllowed,
        ageRestricted
      );
      // send invites, invites is a array of emails
      if (invites.length > 0) {
        for (let i = 0; i < invites.length; i++) {
          try {
            const invitee = await userData.getUserByEmail(invites[i]);
            if (invitee) {
              await userData.addInvite(eventCreated, invitee._id);
            }
          } catch (e) {
            return res.status(500).json({ error: e });
          }
        }
      }

      return res.status(200).json({
        message: 'Event added successfully',
        data: { eventId: eventCreated },
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .get(async (req, res) => {
    try {
      const event = await eventData.getAllEvents();
      return res.json({ message: 'events fetched', data: event });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// accpet invite
router
  .route('/accept/:eventId')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user._id;
    try {
      eventId = validation.checkObjectId(eventId);
      userId = validation.checkObjectId(userId);
    } catch (e) {
      res
        .status(400)
        .json({ error: 'The event is missing a  parameter, try again!' });
    }
    try {
      const event = await eventData.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      const invite = await userData.getInvite(eventId, userId);
      if (!invite) {
        return res.status(404).json({ error: 'Invite not found' });
      }
      await userData.acceptInvite(eventId, userId);
      return res.status(200).json({ message: 'Invite accepted' });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// decline invite
router
  .route('/decline/:eventId')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user._id;
    try {
      eventId = validation.checkObjectId(eventId);
      userId = validation.checkObjectId(userId);
    } catch (e) {
      res
        .status(400)
        .json({ error: 'The event is missing a  parameter, try again!' });
    }
    try {
      const event = await eventData.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      const invite = await userData.getInvite(eventId, userId);
      if (!invite) {
        return res.status(404).json({ error: 'Invite not found' });
      }
      await userData.declineInvite(eventId, userId);
      return res.status(200).json({ message: 'Invite declined' });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// update route
router
  .route('/update/:eventId')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user._id;
    let {
      eventTitle,
      description,
      startDateTime,
      endDateTime,
      address,
      type,
      tags,
      arePicturesAllowed,
      areCommentsAllowed,
      ageRestricted,
    } = req.body;
    try {
      eventId = validation.checkObjectId(eventId);
      userId = validation.checkObjectId(userId);
      eventTitle = validation.checkTitle(eventTitle, 'eventTitle');
      description = validation.checkInputString(description, 'description');
      startDateTime = validation.checkEventDate(startDateTime, 'startDateTime');
      endDateTime = validation.checkEventDate(endDateTime, 'endDateTime');
      address = validation.checkInputString(address, 'address');
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
      const eventuser = await eventData.getEventById(eventId);
      if (eventuser.userId != userId) {
        return res
          .status(401)
          .json({ error: 'You are not authorized to update this event' });
      }
      const event = await eventData.updateEvent(
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
      );
      return res.status(200).json({
        message: 'Event updated successfully',
        data: event,
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// eventImage  upload event image
router
  .route('/image/:eventId')
  .post(
    passport.authenticate('jwt', { session: false }),
    upload.single('eventImage'),
    async (req, res) => {
      let eventId = req.params.eventId;
      let userId = req.user._id;
      const event_photo_url = req.file.filename;
      try {
        eventId = validation.checkObjectId(eventId);
      } catch (e) {
        return res.status(400).json({ error: e });
      }
      try {
        const eventuser = await eventData.getEventById(eventId);
        if (eventuser.userId != userId) {
          return res
            .status(401)
            .json({ error: 'You are not authorized to update this event' });
        }
        const event = await eventData.updateEventPhoto(
          eventId,
          userId,
          event_photo_url
        );
        return res.status(200).json({
          message: 'Event photo updated successfully',
          data: event,
        });
      } catch (e) {
        return res.status(500).json({ error: e });
      }
    }
  );

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

router
  .route('/rsvp/:eventId')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user._id;

    try {
      eventId = validation.checkObjectId(eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const rsvp = await eventData.rsvp(eventId, userId);
      res.status(200).json({ message: 'RSVP added successfully', data: rsvp });
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

router
  .route('/:eventId/comment')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let comment = req.body.comment;
    let userId = req.user._id;
    // console.log(userId);

    try {
      eventId = validation.checkObjectId(eventId);
      comment = validation.checkInputString(comment);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      comment = await comments.createComment(eventId, userId, comment);
      let data = await eventData.getEventById(eventId);
      res
        .status(200)
        .json({ message: 'Comment added successfully', data: data });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

router
  .route('/:eventId/rating')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let rating = req.body.rating;
    let userId = req.user._id;

    try {
      eventId = validation.checkObjectId(eventId);
      rating = validation.checkRating(rating);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let data = null;
      let eventCollection = await events();
      const ratings = await eventCollection.findOne({
        _id: ObjectId(eventId),
      });

      if (!ratings['ratings']) {
        data = await eventData.addRating(eventId, userId, rating);
      } else {
        let rating_id = null;
        const { ratings } = await eventCollection.findOne({
          _id: ObjectId(eventId),
        });

        for (rate of ratings) {
          if (rate['user_id'] === userId) {
            rating_id = rate['_id'];
            break;
          }
        }

        if (rating_id !== null) {
          data = await eventData.updateRating(
            eventId,
            userId,
            rating,
            rating_id
          );
        } else {
          data = await eventData.addRating(eventId, userId, rating);
        }
      }

      return res
        .status(200)
        .json({ message: 'Rating added successfully', data: { data } });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

module.exports = router;
