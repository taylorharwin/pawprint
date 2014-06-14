var controller = require('./controllers.js');

module.exports = exports = function (router) {
  router.route('/:userid')
    .get(controller.getUser)
    .post(controller.createUser);
  routers.route('/:userid/pets/:petid')
    .post(controller.createPet);
  routers.route('/:userid/pets/:petid/request/:requestid')
    .post(controller.createRequest);
};