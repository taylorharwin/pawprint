var morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    middle      = require('./middleware');

/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(morgan('dev'));
  app.use(bodyParser());
  // Middleware
  app.use(middle.cors);
  app.use(middle.logError);
  app.use(middle.handleError);
  // Set up routes

  // TODO: Need to figure out what to serve after front end refactor
  app.use(express.static(__dirname+'/../../client/user'));
  app.use('/admin', express.static(__dirname+'/../../client/admin'));
  app.use(express.static(__dirname+'/../../client'));
  app.use('/admin', routers.AdminRouter);
  app.use('/user', routers.UserRouter);
};