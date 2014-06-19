'use strict';

angular.module('admin.pages.controllers')
  .controller('RequestCtrl', function ($scope, reqIDFactory, statusCodeConst, $http) {

    //sets all values necessary for display of the page

    $scope.reqID = reqIDFactory.getRequestID();
    $scope.vetID = reqIDFactory.getVetID();
    $scope.userID = reqIDFactory.getPetID();
    $scope.petID = reqIDFactory.getUserID();
    $scope.reqStatus = reqIDFactory.getRequestStatus();
    $scope.statusCodes = statusCodeConst;
    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;

    //toggles whether or not a given dropdown menu is open

    $scope.status = {
      isopen: false
    };

    //A generic GET function that gets used across all directives

    $scope.getStuff = function (adminID, endPoint, extraID, callback, subPath) {
      var path;
      if (subPath) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString() + '/' + subPath.toString();
      } else if (extraID) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString();
      } else {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString();
      }
      console.log(path);
      $http.get(path)
      .success(callback)
      .error(function (data, status, headers, config) {
        console.log('error making request:', data, status);
      });
    };

    //Gets all vaccines in database 

    $scope.getAllVaccines = function (func) {
      $http.get('/admin/1/vaccines')
      .success(function (json) {
        $scope.vaccines = json;
        console.log($scope.vaccines);
        if (func) {
          func(json);
        }
      })
      .error(function (data, status, headers, config) {
        console.log('error making request:', data, status);
      });
    };

    $scope.vaccines = $scope.getAllVaccines();

  });
  