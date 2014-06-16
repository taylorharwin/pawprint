var controllerCreate = require('./controller.create.js');

module.exports = exports = function (router) {
  // create admin route
  router.route('/:adminid/request/:requestid/vaccine')
        .post(controllerCreate.createVaccine);
};