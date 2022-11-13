const express = require('express');
const app = express();
const configRoutes = require('./routes');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.NODE_PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app);
app.listen(port, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:' + port);
});
