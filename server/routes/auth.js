const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validation = require('../utils/validation');
const passport = require('passport');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/signup').post(async (req, res) => {
  const user = req.body;
  try {
    req.body.first_name = validation.checkNames(user.first_name, 'first_name');
    req.body.last_name = validation.checkNames(user.last_name, 'last_name');
    req.body.email = validation.checkEmail(user.email);
    req.body.password = validation.checkPassword(user.password);
    req.body.phone = validation.checkPhone(user.phone);
    req.body.dob = validation.checkDate(user.dob);
    req.body.gender = validation.checkGender(user.gender);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  // Check if user already exists with email
  try {
    const userWithEmail = await userData.getUserByEmail(req.body.email);
    if (userWithEmail) {
      return res.status(409).json({ error: 'User already exists' });
    }
  } catch {
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
      return res.status(201).json({
        message: `User ${user.first_name} ${user.last_name} created successfully`,
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
});

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    delete req.user.hashed_password;
    res.json(req.user);
  })
  .post(async (req, res) => {
    const user = req.body;
    try {
      req.body.email = validation.checkEmail(user.email);
      req.body.password = validation.checkPassword(user.password);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      found_user = await userData.getUserByEmail(user.email);

      if (found_user) {
        const match = await bcrypt.compare(
          user.password,
          found_user.hashed_password
        );
        if (match) {
          const payload = { id: found_user._id };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          return res.json({ token });
        } else {
          return res.status(400).json({ error: 'Invalid password' });
        }
      } else {
        return res.status(400).json({ error: 'Email does not exist' });
      }
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

module.exports = router;
