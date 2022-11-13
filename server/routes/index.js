const userRoutes = require('./user');
const authRoutes = require('./auth');
const express = require('express');
const passport = require('passport');

const constructorMethod = (app) => {
  app.use('/user', userRoutes);
  app.use('/auth', authRoutes);
  app.get(
    '/getUser',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      delete req.user.hashed_password;
      res.json(req.user);
    }
  );
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
