// var Auth = require('./controller.auth.js');
var Create = require('./controller.create.js');
var Get = require('./controller.get.js');
var Put = require('./controller.put.js');
var Delete = require('./controller.delete.js');

module.exports = exports = function (router) {
  
  router.route('/vets')
    .get(Get.getVets)
    .post(Create.createVet); // Change this to auto happen on the admin side?

  // router.route('/login')
  //   .post(Auth.login);
  // router.route('/signup')
  //   .post(Auth.signup);  
  router.route('/:userid')
    .get(Get.getUser)
    .put(Put.putUser)
    .delete(Delete.deleteUser);

  router.route('/:userid/pets')
    .get(Get.getPets)
    .post(Create.createPet);
  router.route('/:userid/pets/:petid')
    .put(Put.putPet)
    .delete(Delete.deletePet);

  router.route('/:userid/pets/:petid/vaccines')
    .get(Get.getVaccines);

  router.route('/:userid/pets/:petid/requests')
    .get(Get.getRequests)
    .post(Create.createRequest);
  router.route('/:userid/pets/:petid/requests/:requestid')
    .delete(Delete.deleteRequest);
};

