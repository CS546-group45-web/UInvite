const express = require('express');
const app = express();
const configRoutes = require('./routes');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
dotenv.config();
const strategy = require('./utils/passportStrategy');
const port = process.env.NODE_PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
passport.use(strategy);
app.use(passport.initialize());

configRoutes(app);
app.listen(port, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:' + port);
});
