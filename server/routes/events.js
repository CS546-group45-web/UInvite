const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const eventData = data.events;
const validation = require("../utils/validation");

router
  .route("/create")
  .post(async (req, res) => {
    try {
      let {
        user_id,
        event_title,
        organizer_name,
        Description,
        start_date_time,
        end_date_time,
        address,
        Max_rsvps_count,
        type,
        tags,
      } = req.body;

      user_id = validation.checkObjectId(user_id);
      event_title = validation.checkNames(event_title, "event_title");
      organizer_name = validation.checkNames(organizer_name, "organizer_name");
      Description = validation.checkNames(Description, "description");
      start_date_time = validation.checkEventDate(
        start_date_time,
        "start_date_time"
      );
      end_date_time = validation.checkEventDate(end_date_time, "end_date_time");
      address = validation.checkAdress(address, "address");
      Max_rsvps_count = validation.checkRsvpCount(
        Max_rsvps_count,
        "Max_rsvps_count"
      );
      type = validation.checkEventType(type, "type");
      tags = validation.checkTags(tags, "tags");
    } catch {
      return res.status(400).json({ error: e });
    }
    try {
      const event = await eventData.createEvent(
        user_id,
        event_title,
        organizer_name,
        Description,
        start_date_time,
        end_date_time,
        address,
        Max_rsvps_count,
        type,
        tags
      );
      return res.status(200).json({ message: "Event added successfully" });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  })
  .get(async (req, res) => {
    // code for get all events
    const event = await eventData.getAllEvents();
    return res.json({ EventList: event });
  });

module.exports = router;
