var Create = require('./controller.create.js');
var Get = require('./controller.get.js');
var Put = require('./controller.put.js');
var Delete = require('./controller.delete.js');

module.exports = exports = function (router) {

  router.route('/')
    .post(Create.createUser);
  router.route('/:userid')
    .put(Put.putUser)
    .get(Get.getUser);

  router.route('/:userid/pet')
    .post(Create.createPet);
  router.route('/:userid/pets')
    .get(Get.getPets);
  router.route('/:userid/pet/:petid')
    .put(Put.putPet);

  router.route('/:userid/pet/:petid/vaccines')
    .get(Get.getVaccines);

  router.route('/:userid/requests')
    .get(Get.getRequests);
  router.route('/:userid/pet/:petid/request')
    .post(Create.createRequest);
  router.route('/user/:userid/pet/:petid/request/:requestid')
    .delete(Delete.deleteRequest);
  
  router.route('/vet')
    .post(Create.createVet);
};

