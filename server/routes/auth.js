const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const tokenData = data.tokens;
const validation = require('../utils/validation');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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
      // Send email
      const token = await tokenData.createToken(
        newUser,
        crypto.randomBytes(32).toString('hex')
      );
      const url = `http://localhost:3000/verify/${token}`;
      const message = `Welcome to Uinvite, ${user.first_name} ${user.last_name}!`;
      sendEmail(
        user.email,
        'Welcome to Uinvite!',
        message,
        user.first_name + ' ' + user.last_name,
        url
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

router.route('/verify/:token').get(async (req, res) => {
  try {
    const token = await tokenData.getTokenByToken(req.params.token);
    if (!token) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    const user = await userData.getUserById(token.user_id);
    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    if (user.is_verified) {
      return res.status(400).json({ error: 'User already verified' });
    }
    await userData.verifyUser(user._id);
    await tokenData.deleteToken(token.token);
    return res.status(200).json({ message: 'User verified successfully' });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
