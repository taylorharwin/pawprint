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

    //Variable for two-way binding with request status dropdown
   
    $scope.code = {status: ''};

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
      .error(function (data, status) {
        console.log('error making request:', data, status);
      });
    };

    $scope.postStuff = function (obj, adminID, endPoint, extraID, callback, subPath) {
      var path;
      if (subPath) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString() + '/' + subPath.toString();
      } else if (extraID) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString();
      } else {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString();
      }
      console.log(path);
      $http.post(path, obj)
      .success(callback)
      .error(function (data, status) {
        console.log('error posting data', data, status);
      });
    };


    // A Generic PUT functions that gets used across all directives

    $scope.submitStuff = function (obj, adminID, endPoint, extraID, callback, subPath) {
      var path;
      if (subPath) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString() + '/' + subPath.toString();
      } else if (extraID) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString();
      } else {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString();
      }
      console.log('posting to', path);
      $http.put(path, obj)
      .success(callback)
      .error(function (data, status) {
        console.log('error making request:', data, status);
        $scope.alerts.push({type: 'danger', msg: 'There was an error trying to update'});

      });
    };


    //Gets all vaccines in database 

    $scope.getAllVaccines = function () {
      $http.get('/admin/1/vaccines')
      .success(function (json) {
        $scope.vaccines = json;
        console.log($scope.vaccines);
      })
      .error(function (data, status) {
        console.log('error making request:', data, status);
      });
    };

    $scope.postUpdatedStatus = function (name) {
      $scope.code.status = name;
      console.log($scope.code);
      $scope.submitStuff($scope.code, 1, 'requests', $scope.reqID, function () {
        console.log('success!');
        $scope.alerts.push({ type: 'success', msg: 'Updated status to ' +  $scope.code.status});
        $scope.reqStatus = $scope.code.status;
      });
    };

    $scope.alerts = [];

    $scope.addAlert = function () {}
     

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

  });
  