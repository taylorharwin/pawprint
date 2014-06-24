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
        // scope.getAllVaccinesForRequest();
      }
    };
  })

  .directive('contactHist', function () {
    return {restrict: 'AE',
    scope: true,
    replace: 'true',
    templateUrl: 'app/each_request/templates/contact-hist.tpl.html',
    link: function (scope) {

      //Gets all contact records for a given Request ID
      // scope.updateContacts = function () {
      //   scope.getStuff(1, 'requests', scope.reqID, function (data) {
      //     scope.contacts = data;
      //   }, 'logs');
      // };
      // scope.updateContacts();
      scope.noteText = '';
      scope.noteObj = {
        notes: ''
      };

      //Posts a new note for a given Request ID
      scope.postNote = function () {
        scope.noteObj.notes = scope.noteText;
        scope.postStuff(scope.noteObj, 1, 'requests', scope.reqID, function () {
          scope.alerts.push({type: 'success', msg: 'Added a new note, ' + scope.noteText});
          scope.updateContacts();
        }, 'logs');
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
      scope.vaccineService.getAllVaccines(1).then(function (data) {
        scope.vaccines = data;
      });

      scope.editingVacc = true;
      scope.newVaccine = {name: '',
        dateAdministered: '',
        vaccine_id: ''
      };

      //Not a great practice, but using this constant to track validity of a new vaccine
      scope.duration = 0;



      scope.editVacc = function () {
        scope.editingVacc = !scope.editingVacc;
      };

      //Sets properties on an object at the time when user selects name from dropdown
      scope.setVacc = function (vac, id) {
        scope.newVaccine.name = vac;
        scope.newVaccine.vaccine_id = id;
      };

      //This adds an individual vaccination record for a given request
      scope.postVacc = function (vaccineObject) {
        var toPass = [{id: scope.newVaccine.vaccine_id, dateAdministered: scope.newVaccine.dateAdministered}];
        scope.postStuff(toPass, 1, 'requests', scope.reqID, function () {
          scope.alerts.push({type: 'success', msg: 'Added a new vaccination record'});
          scope.getAllVaccinesForRequest();
        }, 'vaccines');
      };

      //Posts a new vaccine to the global list of vaccines
      scope.sendVaccine = function (vac, duration) {
        var packet = {name: vac, duration: scope.duration};
        // scope.postNewVaccine(packet, function () {
        //   // scope.getAllVaccines();
        //   scope.alerts.push({type: 'success', msg: 'Added new vaccine,' + vac});
        //   console.log(scope.alerts);
        // });
      };
    }
   };
  });
 
