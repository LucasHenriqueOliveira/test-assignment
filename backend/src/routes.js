const express = require('express');
const routes = express.Router();
const AuthMiddleware = require('./middlewares/auth');
const AuthController = require('./controllers/auth');
const UserController = require('./controllers/user');

// login and signup endpoints
routes.post('/login', AuthController.login);
routes.post('/signup', AuthController.signup);

// users endpoints
routes.post('/user', UserController.create);
routes.get('/user', AuthMiddleware.verifyToken, UserController.list);

module.exports = routes;
