const express = require('express');
const router = express.Router();
const data = require('../data');
const mongoCollections = require('../config/mongoCollections');
const events = mongoCollections.events;
const userData = data.users;
const eventData = data.events;
const comments = data.comments;
const validation = require('../utils/validation');
const passport = require('passport');
const upload = require('../utils/uploadImage');

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let type = req.body.type;
    let userId = req.user._id;
    let {
      eventTitle,
      description,
      startDateTime,
      endDateTime,
      address,
      tags,
      invites,
      arePicturesAllowed,
      areCommentsAllowed,
      ageRestricted,
    } = req.body;
    try {
      userId = validation.checkObjectId(userId);
      eventTitle = validation.checkTitle(eventTitle, 'eventTitle');
      description = validation.checkInputString(description, 'description');
      startDateTime = validation.checkEventDate(startDateTime, 'startDateTime');
      endDateTime = validation.checkEventDate(endDateTime, 'endDateTime');
      type = validation.checkEventType(type, 'type');
      tags = validation.checkTags(tags, 'tags');
      if (invites && invites.length > 0) {
        invites = validation.checkInvites(invites, 'invites');
      }
      if (type.toLowerCase() === 'in-person') {
        address = validation.checkInputString(address, 'address');
      }

      if (type.toLowerCase() === 'online') {
        address = validation.checkEventURl(address, 'onlineEventLink');
      }
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
      if (invites && invites.length > 0) {
        for (let i = 0; i < invites.length; i++) {
          try {
            const invitee = await userData.getUserByUsername(invites[i]);
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

// addInvite
router
  .route('/sendInvites/:eventId')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user._id;
    try {
      eventId = validation.checkObjectId(eventId);
      userId = validation.checkObjectId(userId);
      invites = validation.checkInvites(req.body.invites, 'invites');
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const event = await eventData.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      if (invites && invites.length > 0) {
        for (let i = 0; i < invites.length; i++) {
          try {
            const invitee = await userData.getUserByUsername(invites[i]);
            if (invitee._id.toString() === event.ownerId.toString()) {
              return res.status(400).json({ error: 'User owns the event' });
            }
            const invite = await userData.getInvite(eventId, invitee._id);
            if (invite) {
              return res.status(400).json({ error: 'User is already invited' });
            }

            const rsvp = await userData.getRsvp(eventId, invitee._id);
            if (rsvp) {
              return res.status(400).json({ error: 'User is already rsvped' });
            }

            if (invitee) {
              await userData.addInvite(eventId, invitee._id);
            }
          } catch (e) {
            return res.status(500).json({ error: e });
          }
        }
      }
      return res.status(200).json({ message: 'Invites sent' });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// accpet invite
router
  .route('/accept/:eventId')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
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
      // get all invites
      const invites = await eventData.getInvites(userId);
      return res
        .status(200)
        .json({ message: 'Invite accepted', data: invites });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// decline invite
router
  .route('/decline/:eventId')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
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
      // get all invites
      const invites = await eventData.getInvites(userId);

      return res
        .status(200)
        .json({ message: 'Invite declined', data: invites });
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
          .status(403)
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
            .status(403)
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
      return res.status(404).json({ error: e });
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
      const event = await eventData.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
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

router
  .route('/removeRsvp/:eventId')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user._id;

    try {
      eventId = validation.checkObjectId(eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const unrsvp = await eventData.removeRsvp(eventId, userId);
      res
        .status(200)
        .json({ message: 'RSVP removed successfully', data: unrsvp });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// bookmark event to user
router
  .route('/bookmark/:eventId')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user._id;

    try {
      eventId = validation.checkObjectId(eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      // check if event exists
      const event = await eventData.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event does not exist' });
      }
      // check if user owns the event then return error
      if (event.userId == userId) {
        return res
          .status(403)
          .json({ error: 'You cannot bookmark your own event' });
      }
      // check if user has already bookmarked the event
      const bookmarked = await userData.getBookmark(eventId, userId);
      if (bookmarked) {
        return res
          .status(403)
          .json({ error: 'You have already bookmarked this event' });
      }

      const bookmark = await userData.addToBookmarks(eventId, userId);
      res
        .status(200)
        .json({ message: 'Bookmark added successfully', data: bookmark });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// unbookmark event from user
router
  .route('/unbookmark/:eventId')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user._id;

    try {
      eventId = validation.checkObjectId(eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      // check if event exists
      const event = await eventData.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event does not exist' });
      }
      // check if user owns the event then return error
      if (event.userId == userId) {
        return res
          .status(403)
          .json({ error: 'You cannot unbookmark your own event' });
      }
      // check if user has already unbookmarked the event
      const unbookmarked = await userData.getUnbookmark(eventId, userId);
      if (unbookmarked) {
        return res
          .status(403)
          .json({ error: 'You have already unbookmarked this event' });
      }

      const unbookmark = await userData.removeFromBookmarks(eventId, userId);
      res
        .status(200)
        .json({ message: 'Unbookmark added successfully', data: unbookmark });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

//events  Search and filter based on Date, Location, Rating, Age-restricted events and tags
// example query
// http://localhost:4000/api/events/search?eventTitle=party&eventDate=2020-12-12&eventLocation=Toronto&eventTags=party&eventRating=4&eventStartDateTime=2020-12-12&eventEndDateTime=2020-12-12
router.route('/search').get(async (req, res) => {
  let eventTitle = req.query.eventTitle;
  let eventLocation = req.query.eventLocation;
  let eventTags = req.query.eventTags;
  let eventRating = req.query.eventRating;
  let eventStartDateTime = req.query.eventStartDateTime;
  let eventEndDateTime = req.query.eventEndDateTime;

  try {
    const event = await eventData.getEventsBySearch(
      eventTitle,
      eventLocation,
      eventTags,
      eventRating,
      eventStartDateTime,
      eventEndDateTime
    );
    return res.json({ message: 'events fetched', data: event });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// get rsvp list
router
  .route('/rsvpList/:eventId')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user._id;

    try {
      eventId = validation.checkObjectId(eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      // check user owns the event
      const eventuser = await eventData.getEventById(eventId);
      if (eventuser.userId != userId) {
        return res
          .status(403)
          .json({ error: 'You are not authorized to view this event' });
      }

      const rsvp = await eventData.getRsvpList(eventId, userId);
      res.status(200).json({ message: 'RSVP list fetched', data: rsvp });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

// any user can upload event photos
router
  .route('/eventPhoto/:eventId')
  .post(
    passport.authenticate('jwt', { session: false }),
    upload.single('eventPhoto'),
    async (req, res) => {
      let eventId = req.params.eventId;
      let userId = req.user._id;

      try {
        eventId = validation.checkObjectId(eventId);
      } catch (e) {
        return res.status(400).json({ error: e });
      }

      try {
        const event = await eventData.getEventById(eventId);
      } catch (e) {
        return res.status(500).json({ error: e });
      }

      try {
        const eventPhoto = await eventData.addEventPhoto(
          eventId,
          userId,
          req.file.filename
        );
        res
          .status(200)
          .json({ message: 'Event photo added', data: eventPhoto });
      } catch (e) {
        return res.status(500).json({ error: e });
      }
    }
  );

router.route('/title/:eventTitle').get(async (req, res) => {
  let eventTitle = req.params.eventTitle;
  try {
    title = validation.checkTitle(eventTitle);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const event = await eventData.getEventsByTitle(eventTitle);
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
    return res.json({ EventList: event });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router
  .route('/comment/:eventId')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    let eventId = req.params.eventId;
    let comment = req.body.comment;
    let userId = req.user._id;

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
  .route('/rating/:eventId')
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
      data = await eventData.getRatingIfExists(eventId, userId, rating);

      return res
        .status(200)
        .json({ message: 'Rating added successfully', data: { data } });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

module.exports = router;
