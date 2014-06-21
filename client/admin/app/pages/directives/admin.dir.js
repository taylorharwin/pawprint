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
        console.log(scope.vetData);
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
          console.log(scope.petData);
        });
        scope.getStuff(1, 'users', scope.userID, function (data) {
          scope.userData = data;
          console.log(scope.userData);
        });
        scope.updateUserInfo = function () {
          scope.petData = angular.copy(scope.petData);
          console.log(scope.petData);
          scope.userData = angular.copy(scope.userData);
          console.log(scope.userData);
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
      scope.cleanDates = function (arr) {
        for (var i = 0; i < arr.length; i++) {
          var administered = new Date(arr[i].dateAdministered);
          var expires = new Date(arr[i].dateExpired);
          arr[i].dateAdministered = administered.toLocaleDateString();
          arr[i].dateExpired = expires.toLocaleDateString();
        }
        return arr;
      };

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
      scope.updateContacts = function () {
        scope.getStuff(1, 'requests', scope.reqID, function (data) {
          scope.contacts = data;
          console.log('Here is scope.contacts', scope.contacts);
        }, 'logs');
      };
      scope.updateContacts();
    }
   };
  })

  .directive('editVacc', function () {
    return {restrict: 'AE',
    scope: true,
    replace: 'true',
    templateUrl: 'app/pages/templates/edit-vacc.tpl.html',
    link: function (scope, $http) {
      scope.getAllVaccines();
      scope.editingVacc = true;
      scope.editVacc = function () {
        scope.editingVacc = !scope.editingVacc;
      };
      scope.newVac = '';
      scope.addNewVaccine = function (vac) {
        console.log(vac);
      };
   
    }
  };
  });
