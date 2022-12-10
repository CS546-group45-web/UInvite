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
const diff_minutes = require('../utils/diff_minutes');
const { v4: uuidv4 } = require('uuid');
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
      const token = uuidv4();
      const token_created = await tokenData.createToken(newUser, token);
      const url = `${process.env.BASE_URL}/verify/${token}`;
      const message = `Hello, ${user.first_name} ${user.last_name} you have successfully been registered to use UInvite. A new account has been created for you. Please click the link below to verify your email address.`;
      const buttonText = 'Verify Email';
      const headline = 'Verify your email address';
      console.log(url);
      sendEmail(
        user.email,
        'Welcome to Uinvite!',
        message,
        url,
        headline,
        buttonText
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

router.route('/forgot').post(async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    req.body.email = validation.checkEmail(user.email);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const found_user = await userData.getUserByEmail(user.email);
    if (!found_user) {
      return res.status(400).json({ error: 'Email does not exist' });
    }
    const token = uuidv4();
    const token_created = await tokenData.createToken(found_user._id, token);
    // time compare with token_created
    const url = `${process.env.BASE_URL}/reset/${token}`;
    const message = `Hello, ${found_user.first_name} ${found_user.last_name}! You are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following link to complete the process within 15 minutes of receiving it:`;
    const buttonText = 'Forgot Password';
    const headline = 'Forgot Password!';
    sendEmail(user.email, 'Password Reset', message, url, headline, buttonText);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.route('/reset/:token').post(async (req, res) => {
  try {
    const token = await tokenData.getTokenByToken(req.params.token);
    if (!token) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    const user = await userData.getUserById(token.user_id);
    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    // Check if token is expired
    const now = new Date();
    const created_at = new Date(token.created_at);
    const diff = diff_minutes(now, created_at);
    // time difrence
    if (diff > 15) {
      // Delete token
      await tokenData.deleteToken(token.token);
      return res.status(400).json({ error: 'Token expired' });
    }
    const password = req.body.password;
    try {
      req.body.password = validation.checkPassword(password);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    const updatedUser = await userData.updateUserPassword(user._id, password);
    await tokenData.deleteToken(token.token);

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
