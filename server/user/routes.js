var controllerCreate = require('./controller.create.js');
var controllerGet = require('./controller.get.js');

module.exports = exports = function (router) {

  // post requests are the wrong routes
  router.route('/')
    .post(controllerCreate.createUser);
  router.route('/:userid/pets')
    .post(controllerCreate.createPet);
  router.route('/:userid/pets/:petid/request')
    .post(controllerCreate.createRequest);

  // router.route('/:userid')
  //   .get(controllerGet.getUser);
  // router.route('/:userid/pets/:petid')
  //   .get(controllerGet.getPet);
  // router.route('/:userid/pets/:petid/request/:requestid')
  //   .get(controllerGet.getRequest);
};