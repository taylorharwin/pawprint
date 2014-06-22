'use strict';

angular.module('admin.pages.directives')

  .directive('vetInfo', function () {
    return {restrict: 'AE',
     scope: true,
     replace: 'true',
     templateUrl: 'app/pages/templates/vet-info.tpl.html',
     link: function (scope) {
      scope.editingVet = true;
      scope.editVet = function () {
        scope.editingVet = !scope.editingVet;
      };
      scope.getStuff(1, 'vets', scope.vetID, function (data) {
        scope.vetData = data;
      });
      scope.updateVetInfo = function () {
        scope.vetData = angular.copy(scope.vetData);
      };
    }
  };
  })

  .directive('userInfo', function () {
    return {restrict: 'AE',
      scope: true,
      replace: 'true',
      templateUrl: 'app/pages/templates/user-info.tpl.html',
      link: function (scope) {
        scope.editingUser = true;
        scope.editUser = function () {
          scope.editingUser = !scope.editingUser;
        };
        scope.getStuff(1, 'pets', scope.petID, function (data) {
          scope.petData = data;
        });
        scope.getStuff(1, 'users', scope.userID, function (data) {
          scope.userData = data;
        });
        scope.updateUserInfo = function () {
          scope.petData = angular.copy(scope.petData);
          scope.userData = angular.copy(scope.userData);
        };
      }
   };
  })

  .directive('vaccRecord', function () {
    return {restrict: 'AE',
      scope: true,
      replace: 'true',
      templateUrl: 'app/pages/templates/vacc-record.tpl.html',
      link: function (scope) {

        //Formats date Objects as date Strings
      scope.cleanDates = function (arr) {
        for (var i = 0; i < arr.length; i++) {
          var administered = new Date(arr[i].dateAdministered);
          var expires = new Date(arr[i].dateExpired);
          arr[i].dateAdministered = administered.toLocaleDateString();
          arr[i].dateExpired = expires.toLocaleDateString();
        }
        return arr;
      };

      //Gets all the vaccines for a given request ID
      scope.getStuff(1, 'requests', scope.reqID, function (data) {
        scope.vaccinations = scope.cleanDates(data);
      }, 'vaccines');
    }
   };
  })

  .directive('contactHist', function () {
    return {restrict: 'AE',
    scope: true,
    replace: 'true',
    templateUrl: 'app/pages/templates/contact-hist.tpl.html',
    link: function (scope) {

      //Gets all contact records for a given Request ID
      scope.updateContacts = function () {
        scope.getStuff(1, 'requests', scope.reqID, function (data) {
          scope.contacts = data;
        }, 'logs');
      };
      scope.updateContacts();
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
    templateUrl: 'app/pages/templates/edit-vacc.tpl.html',
    link: function (scope) {
      scope.getAllVaccines();
      scope.editingVacc = true;
      scope.newVaccine = {name: '',
        dateAdministered: '',
        vaccine_id: ''
      };
      scope.editVacc = function () {
        scope.editingVacc = !scope.editingVacc;
      };
      scope.setVacc = function (vac, id) {
        scope.newVaccine.name = vac;
        scope.newVaccine.vaccine_id = id;
      };
      scope.postVacc = function (vaccineObject) {
        var toPass = [{id: scope.newVaccine.vaccine_id, dateAdministered: scope.newVaccine.dateAdministered}];
        scope.postStuff(toPass, 1, 'requests', scope.reqID, function () {
          scope.alerts.push({type: 'success', msg: 'Added a new vaccination record'});
        }, 'vaccines');
      };

      //Posts a new vaccine to the global list of vaccines
      scope.sendVaccine = function (vac) {
        var packet = {name: vac};
        scope.postNewVaccine(packet, function () {
          scope.getAllVaccines();
          scope.alerts.push({type: 'success', msg: 'Added new vaccine,' + vac});
          console.log(scope.alerts);
        });
      };
    }
   };
  });
 
