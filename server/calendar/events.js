const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const getUpcomingEvents = async (userId) => {
  // get user googleCalendarDetails
  const user = await userData.getUserById(userId);
  const { googleCalendarDetails } = user;
  // set credentials
  oauth2Client.setCredentials({
    access_token: googleCalendarDetails.googleCalendarDetails,
    refresh_token: googleCalendarDetails.googleRefreshToken,
  });

  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  return res.data.items;
};

const createEvent = async (userId, event) => {
  // get user googleCalendarDetails
  const user = await userData.getUserById(userId);
  const { googleCalendarDetails } = user;
  // set credentials
  oauth2Client.setCredentials({
    access_token: googleCalendarDetails.googleCalendarDetails,
    refresh_token: googleCalendarDetails.googleRefreshToken,
  });
  const res = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });
  return res.data;
};

const updateEvent = async (event) => {
  const res = await calendar.events.update({
    calendarId: 'primary',
    eventId: event.id,
    resource: event,
  });
  return res.data;
};

const deleteEvent = async (eventId) => {
  const res = await calendar.events.delete({
    calendarId: 'primary',
    eventId: eventId,
  });
  return res.data;
};

module.exports = {
  getUpcomingEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
