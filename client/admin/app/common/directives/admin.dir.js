'use strict';
/*global angular*/
/*global vaccine_id*/



angular.module('admin.common.directives')

  .directive('vetInfo', function () {
    return {restrict: 'AE',
     scope: true,
     replace: 'true',
     templateUrl: 'app/each_request/templates/vet-info.tpl.html',
     link: function (scope) {
      scope.editingVet = true;
      scope.editVet = function () {
        scope.editingVet = !scope.editingVet;
      };
      scope.updateVetInfo = function () {
      };
      scope.vetService.getVetInfo(1, scope.vetID).then(function (data) {
        scope.vetData = data;
      });
    }
  };
  })

  .directive('userInfo', function () {
    return {restrict: 'AE',
      scope: true,
      replace: 'true',
      templateUrl: 'app/each_request/templates/user-info.tpl.html',
      link: function (scope) {
        scope.editingUser = true;
        scope.editUser = function () {
          scope.editingUser = !scope.editingUser;
        };

        scope.petService.getPetInfo(1, scope.petID).then(function (data) {
          scope.petData = data;
        });
      }
    };
  })

  .directive('vaccRecord', function () {
    return {restrict: 'AE',
      scope: true,
      replace: 'true',
      templateUrl: 'app/each_request/templates/vacc-record.tpl.html',
      link: function (scope) {
        scope.vaccineService.getAllVaccinationRecords(1, scope.reqID).then(function (data) {
          scope.formattingService.cleanDates.call(data);
          scope.vaccinations = data;
          console.log(data);
        });
      }
    };
  })

  .directive('contactHist', function () {
    return {restrict: 'AE',
    scope: true,
    replace: 'true',
    templateUrl: 'app/each_request/templates/contact-hist.tpl.html',
    link: function (scope) {
      scope.userService.getContactLogs(1, scope.reqID).then(function (data) {
        scope.contacts = data;
        console.log(scope.contacts);
      });

      scope.newContact = {
        notes: '',
        type: '',
        created_at: '',
        adminUser_id: 1
      };
      
      scope.postNote = function () {
        scope.newContact.created_at = new Date();
        scope.userService.addContactLog(1, scope.reqID, scope.newContact).then(function () {
          console.log('updated records');
        });

      };
    }
   };
  })

  .directive('editVacc', function () {
    return {restrict: 'AE',
    scope: true,
    replace: 'true',
    templateUrl: 'app/each_request/templates/edit-vacc.tpl.html',
    link: function (scope) {

      scope.editingVacc = true;
      
      scope.vaccineService.getAllVaccines(1).then(function (data) {
        scope.vaccines = data;
      });
      scope.newVaccine = {
        name: '',
        duration: ''
      };

      scope.setVacc = function (name, id) {
        scope.newVaccinationRecord = {
          'pet_id': scope.petID,
          'name': name,
          'vaccine_id': id,
          'dateAdministered': '',
          'request_id': scope.reqID,
        };
        console.log(scope.newVaccinationRecord);
      };

      scope.editVacc = function () {
        scope.editingVacc = !scope.editingVacc;
      };

      scope.postVaccinationRecord = function (obj) {
        delete obj.name;
        scope.vaccineService.addNewVaccinationRecord(1, scope.reqID, obj).then(function () {
          console.log('added new vacc record');
        });
      };

      //Posts a new vaccine to the global list of vaccines
      scope.sendVaccine = function (newVaccine) {
        var packet = {name: newVaccine.name, duration: newVaccine.duration};
        scope.vaccineService.addNewVaccine(1, packet);
      };
    }
   };
  });

 
