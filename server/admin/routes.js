var Create = require('./controller.create.js');
var Get = require('./controller.get.js');
var Put = require('./controller.put.js');
// var Delete = require('./controller.delete.js'); // TODO

module.exports = exports = function (router) {
  // router.route('/:adminid/requests')
  //   .post(Post.adminLogin);

  router.route('/:adminid/requests')
    .get(Get.getRequests);

  router.route('/:adminid/requests/:requestid')
    .get(Get.getRequest) // TODO deprecate this route
    .put(Put.putRequest);

  router.route('/:adminid/pets/:petid')
    .get(Get.getPet);
  router.route('/:adminid/users/:userid')
    .get(Get.getUser);
  router.route('/:adminid/vets/:vetid')
    .get(Get.getVet);

  router.route('/:adminid/requests/:requestid/vaccines')
    .get(Get.getPetVaccines)
    .post(Create.createPetVaccine);
  // router.route('/:adminid/requests/:requestid/vaccines/:vaccineID')
    // .put(Put.putVaccine) // TODO
    // .delete(Delete.deleteVaccine); // TODO

  router.route('/:adminid/requests/:requestid/logs')
    .get(Get.getLogs)
    .post(Create.createLog);
  router.route('/:adminid/requests/:requestid/logs/:logid')
    .put(Put.putContact) // TODO: change name to 'putLog'
    // .delete(Delete.deleteLog); // TODO

  router.route('/:adminid/requests/:requestid/pdfs')
    .get(Get.getPDFs)
    .post(Create.createPdf);
  // router.route('/:adminid/requests/:requestid/pdfs/:pdfid')
    // .put(Put.putPdf) // TODO
    // .delete(Delete.deletePdf); // TODO

  router.route('/:adminid/vets/:vetid/contacts')
    .get(Get.getVetContacts) // TODO: change to 'getContacts'
    .post(Create.createVetContact); // TODO: change to 'createContacts'
  // router.route('/:adminid/vets/:vetid/contacts/:contactid')
  //   .put(Put.putContact) // TODO
  //   .delete(Delete.deleteContact); // TODO

  router.route('/:adminid/vaccines')
    .get(Get.getVaccines)
    .post(Create.createVaccine) // TODO
    .put(Put.putVaccine); // TODO: deprecate this route?
};
