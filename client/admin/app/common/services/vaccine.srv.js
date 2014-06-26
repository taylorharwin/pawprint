'use strict';
/*global angular*/


angular.module('admin.common.services')
  .service('vaccineService', function (Restangular) {

  function getAllVaccines(adminID) {
    return Restangular.one('admin', adminID).all('vaccines').getList();
  }

  function addNewVaccine(adminID, data) {
    return Restangular.one('admin', adminID).all('vaccines').post(data);
  }

  function getAllVaccinationRecords(adminID, reqID) {
    return Restangular.one('admin', adminID).one('requests', reqID).all('vaccines').getList();
  }

  function addNewVaccinationRecord(adminID, reqID, data) {
    return Restangular.one('admin', adminID).one('requests', reqID).all('vaccines').post(data);
  }

  function getVaccineNameforID(vaccinations, vaccines) {
    angular.forEach(vaccinations, function (vaccRecord) {
      angular.forEach(vaccines, function (vaccine) {
        if (vaccRecord.vaccine_id === vaccine.id) {
          vaccRecord.vaccName = vaccine.name;
        }
      });
    });
    return vaccinations;
  }


  this.vaccinations = [];
  this.getAllVaccines = getAllVaccines;
  this.addNewVaccine = addNewVaccine;
  this.getAllVaccinationRecords = getAllVaccinationRecords;
  this.addNewVaccinationRecord = addNewVaccinationRecord;
  this.getVaccineNameforID = getVaccineNameforID;
     
});