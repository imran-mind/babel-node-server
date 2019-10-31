const routes = require('express').Router();
const usersRoute = require('./users');
const studentsRoute = require('./students');
const coursesRoute = require('./courses');

routes.use('/users', usersRoute);
routes.use('/students', studentsRoute);
routes.use('/courses', coursesRoute);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'pong' });
}); 

module.exports = routes;