const express = require("express");
const router = express.Router();
const data = require("../data");
const mongoCollections = require("../config/mongoCollections");
const userData = data.users;
const eventData = data.events;
const comments = data.comments;
const events = mongoCollections.events;
const validation = require("../utils/validation");
const passport = require("passport");
const { addRating } = require("../data/events");
const { ObjectId, Logger } = require("mongodb");

router
  .route("/")
  .post(passport.authenticate("jwt", { session: false }), async (req, res) => {
    let {
      eventTitle,
      organizerName,
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
      eventTitle = validation.checkTitle(eventTitle, "eventTitle");
      organizerName = validation.checkNames(organizerName, "organizerName");
      description = validation.checkNames(description, "description");
      startDateTime = validation.checkEventDate(startDateTime, "startDateTime");
      endDateTime = validation.checkEventDate(endDateTime, "endDateTime");
      address = validation.checkInputString(address, "address");
      // maxRsvpsCount = validation.checkRsvpCount(maxRsvpsCount, 'maxRsvpsCount');
      type = validation.checkEventType(type, "type");
      tags = validation.checkTags(tags, "tags");
    } catch (e) {
      if (typeof e === "string") return res.status(400).json({ error: e });
      else
        return res
          .status(400)
          .json({ error: "The event is missing a  parameter, try again!" });
    }
    try {
      let eventCreated = await eventData.createEvent(
        userId,
        eventTitle,
        organizerName,
        description,
        startDateTime,
        endDateTime,
        address,
        // maxRsvpsCount,
        type,
        tags
      );
      return res
        .status(200)
        .json({ message: "Event added successfully", eventId: eventCreated });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .get(async (req, res) => {
    const event = await eventData.getAllEvents();
    return res.json({ EventList: event });
  });

router
  .route("/id/:eventId")
  .get(async (req, res) => {
    let eventId = req.params.eventId;
    try {
      eventId = validation.checkObjectId(eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const event = await eventData.getEventById(eventId);
      return res.json({ EventList: event });
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

router.route("/title/:eventTitle").get(async (req, res) => {
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

router.route("/date/:eventDate").get(async (req, res) => {
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
  .route("/:eventId/comment")
  .post(passport.authenticate("jwt", { session: false }), async (req, res) => {
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
        .json({ message: "Comment added successfully", data: data });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

router
  .route("/:eventId/rating")
  .post(passport.authenticate("jwt", { session: false }), async (req, res) => {
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

      if (!ratings["ratings"]) {
        data = await eventData.addRating(eventId, userId, rating);
      } else {
        let rating_id = null;
        const { ratings } = await eventCollection.findOne({
          _id: ObjectId(eventId),
        });

        for (rate of ratings) {
          if (rate["user_id"] === userId) {
            rating_id = rate["_id"];
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
        .json({ message: "Rating added successfully", data: { data } });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

module.exports = router;
