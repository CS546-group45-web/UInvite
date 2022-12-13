const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const validation = require('../utils/validation');
const passport = require('passport');
const upload = require('../utils/uploadImage');
router
  .route('/edit')
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.body;
    try {
      req.body.firstName = validation.checkNames(user.firstName, 'firstName');
      req.body.lastName = validation.checkNames(user.lastName, 'lastName');
      req.body.email = validation.checkEmail(user.email);
      req.body.username = validation.checkUsername(user.username);
      req.body.phone = validation.checkPhone(user.phone);
      req.body.dob = validation.checkDate(user.dob);
      req.body.gender = validation.checkGender(user.gender);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const updatedUser = await userData.updateUser(
        req.user._id,
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.phone,
        user.dob,
        user.gender
      );
      return res.status(200).json({
        message: `User ${user.firstName} ${user.lastName} updated successfully`,
        data: updatedUser,
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

router
  .route('/profileImage')
  .post(
    passport.authenticate('jwt', { session: false }),
    upload.single('profileImage'),
    async (req, res) => {
      try {
        const updatedUser = await userData.updateImageURL(
          req.user._id,
          req.file.filename
        );
        return res.json({
          message: 'Profile image updated successfully',
          data: updatedUser,
        });
      } catch (e) {
        return res.status(500).json({ error: e });
      }
    }
  );

router
  .route('/follow/:id')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const user = await userData.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const updatedUser = await userData.followUser(
        req.user._id,
        req.params.id
      );
      return res.json({
        message: 'User followed successfully',
        data: updatedUser,
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

router
  .route('/unfollow/:id')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const user = await userData.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const updatedUser = await userData.unfollowUser(
        req.user._id,
        req.params.id
      );
      return res.json({
        message: 'User unfollowed successfully',
        data: updatedUser,
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

router
  .route('/followers')
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const followers = await userData.getFollowersInformation(req.user._id);
      return res.json({
        message: 'Followers fetched successfully',
        data: followers,
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });
router.route('/:username').get(async (req, res) => {
  try {
    const user = await userData.getUserByUsername(req.params.username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
