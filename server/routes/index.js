const routes = require('express').Router();
const cars = require('./cars');

// routes.use('/models', models);
routes.use('/cars', cars);


routes.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
}); 

module.exports = routes;