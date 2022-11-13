const userRoutes = require('./user');
// const authRoutes = require('./auth');
const express = require('express');

const constructorMethod = (app) => {
  app.use('/user', userRoutes);
  // app.use('/auth', authRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
