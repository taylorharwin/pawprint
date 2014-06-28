var Controller = require('./controller.js');
var multiparty = require('connect-multiparty');
var multipartMiddleware = multiparty();

module.exports = exports = function (router) {
  // router.route('/:adminid/requests')
  //   .post(Post.adminLogin);

  // GET ALL REQUESTS
  router.route('/:adminid/requests')
    .get(Controller.get.requests);

  // GET AND POST FOR REQUEST
  router.route('/:adminid/requests/:requestid')
    .get(Controller.get.request) // TODO deprecate this route
    .put(Controller.put.request);

  // GET A SPECIFIC PET, USER OR VET
  router.route('/:adminid/pets/:petid')
    .get(Controller.get.pet);
  router.route('/:adminid/users/:userid')
    .get(Controller.get.user);
  router.route('/:adminid/vets/:vetid')
    .get(Controller.get.vet);

  // ROUTES FOR PET VACCINE ENTRIES
  router.route('/:adminid/requests/:requestid/vaccines')
    .get(Controller.get.petVaccines)
    .post(Controller.post.petVaccine);
  router.route('/:adminid/requests/:requestid/vaccines/:vaccineid')
    .put(Controller.put.petVaccine)
    .delete(Controller.destroy.petVaccine);

  // ROUTES FOR CONTACT HISTORY LOGS
  router.route('/:adminid/requests/:requestid/logs')
    .get(Controller.get.logs)
    .post(Controller.post.log);
  router.route('/:adminid/requests/:requestid/logs/:logid')
    .put(Controller.put.log)
    .delete(Controller.destroy.log);

  // ROUTES FOR PDFS
  router.route('/:adminid/requests/:requestid/pdfs')
    .get(Controller.get.pdfs);
  router.route('/:adminid/requests/:requestid/pdfs/:pdfid')
    .put(Controller.put.pdf)
    .delete(Controller.destroy.pdf)
    .get(Controller.get.pdfid);
  // UPLOAD and SERVE PDFs
  router.post('/:adminid/requests/:requestid/pdfs', multipartMiddleware, Controller.post.pdf);

  // ROUTES FOR VET CONTACTS
  router.route('/:adminid/vets/:vetid/contacts')
    .get(Controller.get.vetContacts)
    .post(Controller.post.vetContact);
  router.route('/:adminid/vets/:vetid/contacts/:vetcontactid')
    .put(Controller.put.vetContact)
    .delete(Controller.destroy.vetContact);

  // ROUTES FOR UNIVERSAL VACCINES
  router.route('/:adminid/vaccines')
    .get(Controller.get.vaccines)
    .post(Controller.post.vaccine);
};
