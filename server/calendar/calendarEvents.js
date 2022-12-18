const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

const getCalendarUpcomingEvents = async (userId) => {
  // get user googleCalendarDetails
  const user = await userData.getUserById(userId);
  const { googleCalendarDetails } = user;
  // set credentials
  oauth2Client.setCredentials({
    access_token: googleCalendarDetails.googleCalendarDetails,
    refresh_token: googleCalendarDetails.googleRefreshToken,
  });
  const calendar = google.calendar({ version: 'v3', oauth2Client });
  const { data } = await calendar.events.list({
    auth: oauth2Client,
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  return data.items;
};

const createCalendarEvent = async (userData, event) => {
  // get user googleCalendarDetails
  try {
    const { googleCalendarDetails } = userData;
    // set credentials
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: googleCalendarDetails.googleAccessToken,
      refresh_token: googleCalendarDetails.googleRefreshToken,
    });
    const calendar = google.calendar({ version: 'v3', oauth2Client });
    const res = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      resource: event,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateCalendarEvent = async (calendarEventId, userData, event) => {
  // get user googleCalendarDetails
  try {
    const { googleCalendarDetails } = userData;
    // set credentials
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: googleCalendarDetails.googleAccessToken,
      refresh_token: googleCalendarDetails.googleRefreshToken,
    });
    const calendar = google.calendar({ version: 'v3', oauth2Client });
    const res = await calendar.events.update({
      auth: oauth2Client,
      calendarId: 'primary',
      eventId: calendarEventId,
      resource: event,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const deleteCalendarEvent = async (calendarEventId, userData) => {
  // get user googleCalendarDetails
  try {
    const { googleCalendarDetails } = userData;
    // set credentials
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: googleCalendarDetails.googleAccessToken,
      refresh_token: googleCalendarDetails.googleRefreshToken,
    });
    const calendar = google.calendar({ version: 'v3', oauth2Client });
    const res = await calendar.events.delete({
      auth: oauth2Client,
      calendarId: 'primary',
      eventId: calendarEventId,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getCalendarUpcomingEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
};
