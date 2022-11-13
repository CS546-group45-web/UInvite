const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validation = require('../utils/validation');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await userData.getAllUsers();
      res.json(users);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    const user = req.body;
    try {
      req.body.first_name = validation.checkNames(
        user.first_name,
        'first_name'
      );
      req.body.last_name = validation.checkNames(user.last_name, 'last_name');
      req.body.email = validation.checkEmail(user.email);
      req.body.password = validation.checkPassword(user.password);
      req.body.phone = validation.checkPhone(user.phone);
      req.body.dob = validation.checkDate(user.dob);
      req.body.gender = validation.checkGender(user.gender);
    } catch (e) {
      res.status(400).json({ error: e });
    }
    try {
      const newUser = await userData.createUser(
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.phone,
        user.dob,
        user.gender
      );
      res.json(newUser);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

module.exports = router;
