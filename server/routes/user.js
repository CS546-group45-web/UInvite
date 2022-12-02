const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.route('/').get(async (req, res) => {
  try {
    const users = await userData.getAllUsers();
    res.json(users);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;

