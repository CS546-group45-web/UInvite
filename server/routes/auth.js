const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validation = require('../utils/validation');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/').post(async (req, res) => {
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
        const payload = { id: found_user.id };
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
