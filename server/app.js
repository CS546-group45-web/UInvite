const express = require('express');
const app = express();
const configRoutes = require('./routes');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
dotenv.config();
const strategy = require('./utils/passportStrategy');

const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.SERVER_URL + '/handleGoogleRedirect' // server redirect url handler
);

const events = require('./calendar/events');

const data = require('./data');
const userData = data.users;
const port = process.env.NODE_PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
passport.use(strategy);
app.use(passport.initialize());
app.use('/images', express.static('images'));

app.post('/createAuthLink', cors(), (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar',
    ],
    prompt: 'consent',
  });
  res.send({ url });
});

app.get('/handleGoogleRedirect', cors(), (req, res) => {
  const code = req.query.code;
  console.log(code);
  if (code) {
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token', err);
        return;
      }
      oauth2Client.setCredentials(token);
      console.log(token);
      const accessToken = token.access_token;
      const refreshToken = token.refresh_token;
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      res.redirect(
        process.env.BASE_URL + '/googleAuth/' + accessToken + '/' + refreshToken
      );
    });
  }
});

app.get(
  '/storeGoogleTokens',
  cors(),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const accessToken = req.query.accessToken;
    const refreshToken = req.query.refreshToken;
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    const calendar = google.calendar({ version: 'v3', oauth2Client });
    try {
      const { data } = await calendar.calendarList.list({
        auth: oauth2Client,
      });
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].primary) {
          const calendarId = data.items[i].id;
          console.log(calendarId);
          try {
            await userData.storeCalendarDetails(req.user._id, {
              googleCalendarId: calendarId,
              googleAccessToken: accessToken,
              googleRefreshToken: refreshToken,
            });
            return res.status(200).json({ message: 'success' });
          } catch (e) {
            return res.status(500).json({ error: e });
          }
        }
      }
    } catch (e) {
      res
        .status(500)
        .json({ error: 'Error while fetching google calendar details' });
    }
  }
);

app.get(
  '/getGoogleEvents',
  cors(),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = req.user;
    const { googleCalendarDetails } = user;
    oauth2Client.setCredentials({
      access_token: googleCalendarDetails.googleAccessToken,
      refresh_token: googleCalendarDetails.googleRefreshToken,
    });
    const calendar = google.calendar({ version: 'v3', oauth2Client });
    try {
      const { data } = await calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        timeMax: new Date(new Date().setDate(new Date().getDate() + 30)),
        singleEvents: true,
        orderBy: 'startTime',
      });

      return res.status(200).json({ message: 'success', data });
    } catch (e) {
      console.log(e);
    }
  }
);

configRoutes(app);
app.listen(port, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on ' + process.env.SERVER_URL);
});
