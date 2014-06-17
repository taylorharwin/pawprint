var controllerCreate = require('./controller.create.js');
var controllerGet = require('./controller.get.js');
var controllerPut = require('./controller.put.js');
var controllerDelete = require('./controller.delete.js');

module.exports = exports = function (router) {

  router.route('/')
    .post(controllerCreate.createUser);
  router.route('/:userid/pet')
    .post(controllerCreate.createPet);
  router.route('/:userid/pet/:petid/request')
    .post(controllerCreate.createRequest);
  router.route('/vet')
    .post(controllerCreate.createVet);

  router.route('/:userid')
    .put(controllerPut.putUser);
  router.route('/:userid/pet/:petid')
    .put(controllerPut.putPet);
  router.route('/user/:userid/pet/:petid/request/:requestid')
    .delete(controllerDelete.deleteRequest);

  // router.route('/:userid')
  //   .get(controllerGet.getUser);
  // router.route('/:userid/pets/:petid')
  //   .get(controllerGet.getPet);
  // router.route('/:userid/pets/:petid/request/:requestid')
  //   .get(controllerGet.getRequest);
};

// /user/:userid/pet/:petid/request/:requestid