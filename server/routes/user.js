const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validation = require('../utils/validation');
const passport = require('passport');
router
  .route('/edit')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.body;
    try {
      req.body.first_name = validation.checkNames(
        user.first_name,
        'first_name'
      );
      req.body.last_name = validation.checkNames(user.last_name, 'last_name');
      req.body.email = validation.checkEmail(user.email);
      req.body.phone = validation.checkPhone(user.phone);
      req.body.dob = validation.checkDate(user.dob);
      req.body.gender = validation.checkGender(user.gender);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const updatedUser = await userData.updateUser(
        req.user._id,
        user.first_name,
        user.last_name,
        user.email,
        user.phone,
        user.dob,
        user.gender
      );
      return res.status(200).json({
        message: `User ${user.first_name} ${user.last_name} updated successfully`,
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

module.exports = router;
