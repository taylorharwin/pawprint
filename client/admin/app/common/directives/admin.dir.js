'use strict';

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

      scope.editVacc = function () {
        scope.editingVacc = !scope.editingVacc;
      };

      //Sets properties on an object at the time when user selects name from dropdown
      scope.setVacc = function (vac, id) {
        scope.newVaccine.name = vac;
        scope.newVaccine.vaccine_id = id;
      };

      //Posts a new vaccine to the global list of vaccines
      scope.sendVaccine = function (newVaccine) {
        var packet = {name: newVaccine.name, duration: newVaccine.duration};
        scope.vaccineService.addNewVaccine(1, packet);
      };
    }
   };
  });

 
