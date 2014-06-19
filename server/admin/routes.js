var Create = require('./controller.create.js');
var Get = require('./controller.get.js');
var Put = require('./controller.put.js');

module.exports = exports = function (router) {
  // create admin route
  router.route('/:adminid/requests')
    .get(Get.getRequests);
  router.route('/:adminid/requests/:requestid')
    .get(Get.getRequest);
  router.route('/:adminid/pets/:petid')
    .get(Get.getPet);
  router.route('/:adminid/users/:userid')
    .get(Get.getUser);
  router.route('/:adminid/vets/:vetid')
    .get(Get.getVet);
  router.route('/:adminid/vets/:vetid/contacts')
    .get(Get.getVetContacts);
  router.route('/:adminid/requests/:requestid/vaccines')
    .get(Get.getVaccines);
  router.route('/:adminid/requests/:requestid/logs')
    .get(Get.getLogs);
  router.route('/:adminid/requests/:requestid/pdfs')
    .get(Get.getPDFs);
  
  router.route('/:adminid/requests/:requestid/contacts')
    .post(Create.createContact);
  router.route('/:adminid/vets/:vetid/contacts')
    .post(Create.createVetContact);
  router.route('/:adminid/requests/:requestid/pdf')
    .post(Create.createPdf);
  
  router.route('/:adminid/requests/:requestid/vaccines')
    .post(Create.createVaccine)
    .put(Put.putVaccine);
  router.route('/:adminid/requests/:requestid/contacts/:contactid')
    .put(Put.putContact);
};

// PUT /admin/:adminid/request/:requestid/contact/:id  update contact log  {contactID: {contact type: xxx, admin: xxx, ...}}
// PUT /admin/:adminid/request/:requestid/vaccines update vaccine entries [array]  {vaccineID: {vaccine: xxx, date administered:xxx, ... }}
// PUT /admin/:adminid/vet/:vetid/vetcontact/:id update vet contact  {vaccineID: {name: xxx, vetID:xxx, ...}}
