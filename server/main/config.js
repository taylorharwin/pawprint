"use strict";

var knex        = require('knex'),
    bookshelf    = require('bookshelf'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    middle      = require('./middleware');

var knex = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'pawprint',
    password: 'password',
    database: 'pawprint',
    charset: 'utf8',
  }
});

var db = bookshelf(knex);

/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.set('db', db);
  app.use(morgan('dev'));
  // bodyParser security concerns - think about using
  app.use(bodyParser());
  app.use(middle.cors);
  app.use(express.static(__dirname + '/../../client'));
  app.use('/extra', routers.ExtraRouter);
  app.use(middle.logError);
  app.use(middle.handleError);
};