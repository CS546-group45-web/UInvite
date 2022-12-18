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
      // get access token and refresh token
      const accessToken = token.access_token;
      const refreshToken = token.refresh_token;

      res.json({ accessToken, refreshToken });
    });
  }
});

configRoutes(app);
app.listen(port, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:' + port);
});
