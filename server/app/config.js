var morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    middle      = require('./middleware'),
    expressJwt  = require('express-jwt'),
    auth        = require('../user/controller.auth.js');

/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  // Middleware
  app.use(middle.cors);
  app.use(middle.logError);
  app.use(middle.handleError);
  // Set up routes
  app.use(express.static(__dirname+'/../../client/user'));
  app.use('/admin', express.static(__dirname+'/../../client/admin'));
  app.use(express.static(__dirname+'/../../client'));
  // Unprotected login and signup routes
  app.use('/user/login', auth.login);
  app.use('/user/signup', auth.signup);
  // JWT protected routes
  // @TODO check user can only send to routes that he is registered to by decrypting JWT somehow
  app.use('/admin', expressJwt({ secret: process.env.USER_SECRET || 'usersecret' }));
  app.use('/user', expressJwt({ secret: process.env.USER_SECRET || 'usersecret' }));
  app.use('/admin', routers.AdminRouter);
  app.use('/user', routers.UserRouter);
};