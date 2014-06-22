var Create = require('./controller.create.js');
var Get = require('./controller.get.js');
var Put = require('./controller.put.js');
var Delete = require('./controller.delete.js');

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
  router.route('/:adminid/requests/:requestid/vaccines/:vaccineid')
    .put(Put.putPetVaccine)
    .delete(Delete.deletePetVaccine);

  router.route('/:adminid/requests/:requestid/logs')
    .get(Get.getLogs)
    .post(Create.createLog);
  router.route('/:adminid/requests/:requestid/logs/:logid')
    .put(Put.putLog)
    .delete(Delete.deleteLog);

  router.route('/:adminid/requests/:requestid/pdfs')
    .get(Get.getPDFs)
    .post(Create.createPdf);
  router.route('/:adminid/requests/:requestid/pdfs/:pdfid')
    .put(Put.putPdf)
    .delete(Delete.deletePdf);

  router.route('/:adminid/vets/:vetid/contacts')
    .get(Get.getVetContacts)
    .post(Create.createVetContact);
  router.route('/:adminid/vets/:vetid/contacts/:vetcontactid')
    .put(Put.putVetContact)
    .delete(Delete.deleteVetContact);

  router.route('/:adminid/vaccines')
    .get(Get.getVaccines)
    .post(Create.createVaccine);
};
