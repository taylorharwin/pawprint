'use strict';
/*global angular*/



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
<<<<<<< HEAD
=======
      scope.updateVetInfo = function () {
      };
>>>>>>> bug fixes
      scope.vetService.getVetInfo((scope.AuthService.getCookie().userId), scope.vetID).then(function (data) {
        scope.vetData = data;
      });

      // Can use this function to update vet info from admin panel, if needed.
      // scope.updateVetInfo = function (data) {
      //   console.log(scope.vetData);
      //   scope.vetService.editVetInfo((scope.AuthService.getCookie().userId), scope.vetID, data).then(function () {
      //     var msg = 'Updated Vet Info';
      //     scope.alertsService.add('success', msg);
      //   });
      // };
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

        scope.petService.getPetInfo((scope.AuthService.getCookie().userId), scope.petID).then(function (data) {
          data.birthdate = (new Date(data.birthdate)).toLocaleDateString();
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
        scope.vaccineService.getAllVaccinationRecords((scope.AuthService.getCookie().userId), scope.reqID).then(function (data) {
          scope.formattingService.cleanDates.call(data);
          scope.vaccineService.getVaccineNameforID(data, scope.allVaccines);
          scope.vaccineService.vaccinations = data;
          console.log(scope.vaccineService.vaccinations);
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
      scope.userService.getContactLogs((scope.AuthService.getCookie().userId), scope.reqID).then(function (data) {
        scope.contacts = data;
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
          var msg = 'Added a new account note';
          scope.alertsService.add('success', msg);
          scope.userService.getContactLogs((scope.AuthService.getCookie().userId), scope.reqID).then(function (data) {
            scope.contacts = data;
          });
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
      };

      scope.editVacc = function () {
        scope.editingVacc = !scope.editingVacc;
      };

      scope.postVaccinationRecord = function (obj) {
        delete obj.name;
        scope.vaccineService.addNewVaccinationRecord((scope.AuthService.getCookie().userId), scope.reqID, obj).then(function () {
          var msg = 'Added a new vaccination record';
          scope.alertsService.add('success', msg);
          scope.vaccineService.getAllVaccinationRecords((scope.AuthService.getCookie().userId), scope.reqID).then(function (data) {
            scope.formattingService.cleanDates.call(data);
            scope.vaccineService.getVaccineNameforID(data, scope.allVaccines);
            scope.vaccineService.vaccinations = data;
          });
        });
      };

      //Posts a new vaccine to the global list of vaccines
      scope.sendVaccine = function (newVaccine) {
        var packet = {name: newVaccine.name, duration: newVaccine.duration};
        scope.vaccineService.addNewVaccine((scope.AuthService.getCookie().userId), packet).then(function () {
          var msg = 'Added a new vaccine to the DB';
          scope.alertsService.add('success', msg);
          scope.vaccineService.getAllVaccines((scope.AuthService.getCookie().userId)).then(function (data) {
            scope.allVaccines = data;
          });
        });
      };
    }
   };
  });

 
