var controller = require('./controllers.js');

module.exports = exports = function (router) {

  // post requests are the wrong routes
  router.route('/')
    .post(controller.createUser);
  routers.route('/:userid/pets/')
    .post(controller.createPet);
  routers.route('/:userid/pets/:petid/request/')
    .post(controller.createRequest);
};