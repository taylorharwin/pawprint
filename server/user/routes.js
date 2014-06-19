var Create = require('./controller.create.js');
var Get = require('./controller.get.js');
var Put = require('./controller.put.js');
var Delete = require('./controller.delete.js');

module.exports = exports = function (router) {

  router.route('/')
    .post(Create.createUser);
  router.route('/:userid')
    .get(Get.getUser)
    .put(Put.putUser)
    // .delete(Delete.deleteUser);

  router.route('/:userid/pets')
    .get(Get.getPets)
    .post(Create.createPet);
  router.route('/:userid/pets/:petid')
    .put(Put.putPet)
    // .delete(Delete.deletePet);

  router.route('/:userid/pets/:petid/vaccines')
    .get(Get.getVaccines);

  router.route('/:userid/pets/:petid/requests')
    .get(Get.getRequests) // change this to get requests per pet
    .post(Create.createRequest);
  router.route('/:userid/pets/:petid/requests/:requestid')
    .delete(Delete.deleteRequest);
  
  router.route('/vets')
    // .get(Get.getVets)
    .post(Create.createVet); // Change this to auto happen on the admin side?
};

