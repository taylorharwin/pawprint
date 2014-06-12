var express         = require('express');
var app             = express();
var routers         = {};
var AdminRouter     = express.Router();
var UserRouter      = express.Router();

routers.AdminRouter = AdminRouter;
routers.UserRouter = UserRouter;

require('./config.js')(app, express, routers);
require('./db_config.js')(app);

require('../admin/routes.js')(AdminRouter);
require('../user/routes.js')(UserRouter);

module.exports = exports = app;
